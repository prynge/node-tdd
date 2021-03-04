const request = require('supertest')
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')
require('./factories/post').factory
require('./factories/author').factory
    //require('./factories/account').factory
require('./factories/booking').factory
    //require('./factories/companies').factory
    //require('./factories/users').factory
const factory = require('factory-girl').factory

beforeAll(async() => {
    await cleanDb(db)
});

afterAll(async() => {
    await cleanDb(db)
    await db.close()
});

describe('GET /', () => {
    let response;

    beforeEach(async() => {
            await cleanDb(db)
                //response = await request(app).get('/');

            await factory.create('Companies', { name: 'Gembani' });

            const companies = await db.Company.findAll();

            for (let i = 0; i < 5; i++) {
                randomcomp = Math.random() * companies.length);
            await factory.create('Users', { CompanyID: companies[randomcomp].id });
        }

        for (let i = 0; i < 5; i++) {
            randomcomp = Math.random() * companies.length); await factory.create('Accounts', { CompanyID: companies[randomcomp].id });
    }

    const accounts = await db.Account.findAll();
    for (let i = 0; i < 5; i++) {
        randomaccEmp = Math.random() * accounts.length);
    randomaccCli = Math.random() * accounts.length); await factory.create('Bookings', { ClientId: accounts[randomaccCli].id, EmployeeId: accounts[randomaccEmp].id });
}



})

test('It should respond with a 200 status code', async() => {
expect(response.statusCode).toBe(200);
});
});

describe('POST /author', () => {

    let response;
    let data = {};

    beforeAll(async() => {
        data.firstName = 'John'
        data.lastName = 'Wick'
        response = await request(app).post('/author').send(data);
    })

    test('It should respond with a 200 status code', async() => {
        expect(response.statusCode).toBe(200);
    });

    test('It should return a json with the new author', async() => {
        expect(response.body.firstName).toBe(data.firstName);
        expect(response.body.lastName).toBe(data.lastName);
    });

    test('It should create and retrieve a post for the selected author', async() => {
        const author = await db.Author.findOne({
            where: {
                id: response.body.id
            }
        })
        expect(author.id).toBe(response.body.id)
        expect(author.firstName).toBe(data.firstName)
        expect(author.lastName).toBe(data.lastName)
    });
});

describe('GET /authors', () => {

    let response;
    let data = {};

    beforeAll(async() => await cleanDb(db))

    describe('when there is no author in database', () => {
        beforeAll(async() => {
            response = await request(app).get('/authors').set('Accept', 'application/json');
        })

        test('It should not retrieve any authors in db', async() => {
            const authors = await db.Author.findAll()
            expect(authors.length).toBe(0);
        });

        test('It should respond with a 200 status code', async() => {
            expect(response.statusCode).toBe(200);
        });

        test('It should return a json with a void array', async() => {
            expect(response.body).toStrictEqual([]);
        });
    })
});

describe('when there is one or more authors in database', () => {
    beforeAll(async() => {
        authors = await factory.createMany('author', 5)
        response = await request(app).get('/authors').set('Accept', 'application/json')
    })

    test('It should not retrieve any author in db', async() => {
        const authorsInDatabase = await db.Author.findAll()
        expect(authorsInDatabase.length).toBe(5)
    });
    test('It should respond with a 200 status code', async() => {
        expect(response.statusCode).toBe(200)
    });
    test('It should return a json with a void array', async() => {
        expect(response.body.length).toBe(5)
        for (i = 0; i < 5; i++) {
            const expectedBody = {
                id: authors[i].id,
                firstName: authors[i].firstName,
                lastName: authors[i].lastName,
            }
            expect(response.body).toContainEqual(expectedBody)
        }
    });
})

describe('POST /post', () => {

    let response
    let data = {}
    let post
    let author

    beforeAll(async() => await cleanDb(db))

    describe('The author has one or multiple posts', () => {
        beforeAll(async() => {
            author = await factory.create('author')
            post = await factory.build('post')
            data.title = post.title
            data.content = post.content
            data.AuthorId = author.id
            response = await request(app).post('/post').send(data).set('Accept', 'application/json')
        })
        test('It should respond with a 200 status code', async() => {
            expect(response.statusCode).toBe(200);
        });

        test('It should create and retrieve a post for the selected author', async() => {
            const postsInDatabase = await db.Post.findAll()
            expect(postsInDatabase.length).toBe(1)
            expect(postsInDatabase[0].title).toBe(post.title)
            expect(postsInDatabase[0].content).toBe(post.content)
        });

        test('It should return a json with the author\'s posts', async() => {
            expect(response.body.title).toBe(data.title);
            expect(response.body.content).toBe(data.content);
        });

        test('The post should belong to the selected authors\' posts', async() => {
            const posts = await author.getPosts()
            expect(posts.length).toBe(1)
            expect(posts[0].title).toBe(post.title)
            expect(posts[0].content).toBe(post.content)
        })
    })
});

const json = '{  "attendees": [{"displayName": "Nick Stock", "email": "client@client.com","organizer": true,"response_status": "accepted"}, {"displayName": "Nicholas Stock","email": "not_client@client.com","response_status": "accepted","self": true}],"end": { "date_time":"2018-03-05T18:30:00.000+01:00" },"html_link": "https://www.google.com/calendar/event?eid=MGptdjJ1ZDljMWo3Y2kyZzFqZ21ybWY2c3Mgbmlja0BnZW1iYW5pLmNvbQ", "id": "0jmv2ud9c1j7ci2g1jgmrmf6ss","start": { "date_time": "2018-03-05T12:30:00.000+01:00" },  "status": "confirmed",  "summary": "summary"}';

const payload = JSON.parse(json)
class EventConverter {
    constructor(payload, account) {
        this.payload = payload
        this.account = account
    }

    client() {
        const clients = this.account.getClientUsers().map(client => this.payload.attendees.filter(attendee => client.email === attendee.email))
        return clients[0];
    }

    employee() {
        const clients = this.account.getClientUsers().map(client => this.payload.attendees.filter(attendee => client.email !== attendee.email))
        return clients[0];
    }

    parse_date(date) {
        return Date.parse(date.toString())
    }

    get_htmlId() {
        return this.payload.html_link.substring(42)
    }


    booking() {
        const booking = {}
        booking.client = this.client()
        booking.employee = this.employee()
        booking.startDate = this.parse_date(this.payload.start.date_time)
        booking.endDate = this.parse_date(this.payload.end.date_time)
        booking.bookingId = this.get_htmlId()
        booking.summary = this.payload.summary
        booking.status = this.payload.status
        return booking
    }

    show() {
        console.log(this.payload.html_link);
    }


}

describe('GET /events', () => {

    let response;
    let data = {};

    describe('when there is a payload', () => {
        let account = {
            users: [
                { email: "client@client.com" },
                {
                    email: "client2@client.com",
                }
            ],
            getClientUsers() {
                return this.users;
            },
            getEmployeeUsers() {}

        }

        let company = {
            companyId: "",
            companyName: "Gembani",
        }





        test('It should respond with start date', async() => {
            eventConverter = new EventConverter(payload);
            start = eventConverter.payload.start.date_time
            console.log(Date(start.toString()))
                //expect(link.toString()).toEqual(expect.stringContaining("https://www.google.com/calendar/event?eid="))
        });


        test('It should respond with Client ', async() => {
            eventConverter = new EventConverter(payload, account);
            client = eventConverter.client()
            console.log(client);
            //expect(client).toBe("client@client.com")
        });


        test('It should respond with booking ', async() => {
            eventConverter = new EventConverter(payload, account);
            booking = eventConverter.booking()
            console.log(booking);
            expect(booking).not.toBe(undefined)
        });




    })
});

describe('GET /booking', () => {

    let response;
    let data = {};


    beforeAll(async() => await cleanDb(db))

    describe('when there is no booking in database', () => {
        beforeAll(async() => {
            response = await request(app).get('/booking').set('Accept', 'application/json');
        })

        test('It should not retrieve any bookings in db', async() => {
            const bookings = await db.Booking.findAll()
            expect(bookings.length).toBe(0);
        });

        test('It should respond with a 200 status code', async() => {
            expect(response.statusCode).toBe(200);
        });

        test('It should return a json with a void array', async() => {
            expect(response.body).toStrictEqual([]);
        });

    })
});

/*describe('POST /booking', () => {

  let response
  let data
  let account = {
    users: [
      {email: "client@client.com"},
      {email: "client2@client.com",
    }],
    getClientUsers(){
      return this.users;
    },
    getEmployeeUsers(){}

  }

  beforeAll(async () => {
    eventConverter = new EventConverter(payload,account);
    data=eventConverter.booking()
    response = await request(app).post('/booking').send(data);
  })

  test('It should respond with a 200 status code', async () => {
    expect(response.statusCode).toBe(200);
  });
  
  test('It should return a json with the new booking', async () => {
    expect(response.body.bookingId).toBe(data.bookingId);
    expect(Date.parse(response.body.startDate)).toBe(data.startDate);
  });

  test('It should create and retrieve a post for the selected booking', async () => {
    const booking = await db.Booking.findOne({where: {
      id: response.body.id
    }})
    expect(booking.id).toBe(response.body.id)
    expect(response.body.bookingId).toBe(data.bookingId);
    expect(Date.parse(response.body.startDate)).toBe(data.startDate);
  });
});*/

describe('when there is one or more bookings in database', () => {
        beforeAll(async() => {
            bookings = await factory.createMany('booking', 5)
            response = await request(app).get('/booking').set('Accept', 'application/json')
        })

        test('It should not retrieve any booking in db', async() => {
            const bookingsInDatabase = await db.Booking.findAll()
            expect(bookingsInDatabase.length).toBe(5)
        });
        test('It should respond with a 200 status code', async() => {
            expect(response.statusCode).toBe(200)
        });
        test('It should return a json with a void array', async() => {
            expect(response.body.length).toBe(5)
            for (i = 0; i < 5; i++) {
                const expectedBody = {
                    id: bookings[i].id,
                    bookingId: bookings[i].bookingId,
                    status: bookings[i].status,
                    summary: bookings[i].summary
                }
                expect(response.body).toContainEqual(expectedBody)
            }
        });
    })
    /*
    describe('GET /account', () => {

      let response;
      let data = {};

      beforeAll(async () => await cleanDb(db))

      describe('when there is no Account in database', () => {
        beforeAll(async () => {
          response = await request(app).get('/account').set('Accept', 'application/json');
        })

        test('It should not retrieve any accounts in db', async () => {
          const accounts = await db.Account.findAll()
          expect(accounts.length).toBe(0);
        });

        test('It should respond with a 200 status code', async () => {
          expect(response.statusCode).toBe(200);
        });

        test('It should return a json with a void array', async () => {
          expect(response.body).toStrictEqual([]);
        });
      })
    });*/