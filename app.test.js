// supertest requirements
const request = require("supertest") //request object makes a request to our app as if it came from the networks
const app = require('./app')

// So "describe" is a block of related tests, and each "test" is testing a different thing
// Eg we would describe("/books"), test("can post"), test("can get all") etc 

describe("App Tests", () => {
    test("GET /", async () => {
        const result = await request(app).get("/") //sets up the test object
        // specify which endpoint i am requesting
        expect(result.status).toBe(200) //assertions expect("what is the entity i want to test").toBe("what value should the entity be")
        expect(result.body.info).toMatch(/Word/i) // expecting res.body.info to have journal appear somewhere in it
    })

    test("GET /words", async () => {
        const res = await request(app).get("/words")
        // const expected = [/foot/i, /foo/i, /foo/i]

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i) // match json case insensitive
        expect(res.body.length).toBe(10)
        expect(res.body[0].word).toMatch(/foot/i)

        // res.body.forEach((word, index) => {
        //     expect(word.word).toMatch(expected[index])
        // });     

    })

    test("POST /word_list", async () => {
        const res = await request(app)
            .post("/word_list")
            .send({
                word: "eggs",
                definition: "food"
            })

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/i) // match json case insensitive
        expect(res.body.id).toBeTruthy()
        expect(res.body.word).toBe("eggs")
    })

}) // specify the actual tests themselves

