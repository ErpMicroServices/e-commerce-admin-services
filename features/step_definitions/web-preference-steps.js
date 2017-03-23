var {
    defineSupportCode
} = require('cucumber');

defineSupportCode(function({
    Given,
    When,
    Then
}) {

    Given('I have provided a web preference type called {stringInDoubleQuotes}', function(web_preference_type, callback) {
        this.web_preference_type = web_preference_type;
        callback();
    });

    Given('a web preference type exists called {stringInDoubleQuotes}', function(web_preference_type) {
        return this.db.one("insert into web_preference_type (description) values ($1) returning id", [web_preference_type])
            .then((data) => this.exisiting_web_preference_id = data.id);
    });

    When('I save the web preference type', function() {
        return this.axios
            .post("/", {
                "query": "mutation create_web_preference_type($description : String!){  create_web_preference_type( description : $description){ id }}",
                "variables": {
                    "description": this.web_preference_type
                },
                "operationName": "create_web_preference_type"
            })
            .then((response) => this.result = response);
    });

    When('I retrieve a list of web preferences', function() {
        return this.axios
            .post("/", {
                "query": "{ web_preference_types {id,description}}",
                "variables": null,
                "operationName": null
            })
            .then((response) => this.result = response);
    });

    When('I update the web preference to {stringInDoubleQuotes},', function(web_preference) {
        return this.axios.post("/", {
                "query": "mutation update_web_preference_type($id: ID!, $description : String!){  update_web_preference_type( id: $id, description : $description){id description} }",
                "variables": {
                    "id": this.exisiting_web_preference_id,
                    "description": web_preference
                },
                "operationName": "update_web_preference_type"
            })
            .then((response) => this.result = response);
    });

    When('I delete a web preference type', function() {
        return this.axios.post("/", {
                "query": "mutation delete_web_preference_type($id: ID!){  delete_web_preference_type( id: $id){id}}",
                "variables": {
                    "id": this.exisiting_web_preference_id,
                },
                "operationName": "delete_web_preference_type"
            })
            .then((response) => this.result = response);
    });

    Then('the web preference type is in the database', function() {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.be.falsy;
        expect(this.result.data.data).to.exist;
        if (this.result.data.data.update_web_preference_type) {
            expect(this.result.data.data.update_web_preference_type.web_preference).to.exist;
            expect(this.result.data.data.update_web_preference_type.errors).to.not.exist;
        } else {
            expect(this.result.data.data.create_web_preference_type.id).to.exist;
            expect(this.result.data.data.create_web_preference_type.errors).to.not.exist;
        }
        return this.db.one("select id, description from web_preference_type where id = $1", [this.result.data.data.create_web_preference_type.id])
            .then((data) => {console.log('data: ',data);
                expect(data.description).to.be.equal(this.web_preference_type);
            })
    });

    Then('I get an error message', function(callback) {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.exist;
        callback();
    });

    Then('the web preference list contains {stringInDoubleQuotes}', function(web_preference_type, callback) {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.be.falsy;
        expect(this.result.data.data).to.exist;
        expect(this.result.data.data.web_preference_types.map((d) => d.description)).to.include(web_preference_type)
        callback();
    });

    Then('the web preference value in the database is {stringInDoubleQuotes}', function(web_preference_value) {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.be.falsy;
        expect(this.result.data.data).to.exist;
        return this.db.one("select id, description from web_preference_type where id = $1", [this.exisiting_web_preference_id])
            .then((data) => {
                expect(data.description).to.be.equal(web_preference_value);
            });
    });

    Then('the web preference type called {stringInDoubleQuotes} does not exist', function(web_preference_type) {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.be.falsy;
        expect(this.result.data.data).to.exist;
        return this.db.one("select id, description from web_preference_type where id = $1", [this.exisiting_web_preference_id])
            .then((data) => {
                expect(data).to.not.be.ok;
            })
            .catch((error) => {
                expect(error.message).to.be.equal("No data returned from the query.");
            })
    });
});
