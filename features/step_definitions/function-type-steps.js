var {
    defineSupportCode
} = require('cucumber');

defineSupportCode(function({
    Given,
    When,
    Then
}) {

    Given('I have provided a function type called {stringInDoubleQuotes}', function(function_type, callback) {
        this.function_type = function_type;
        callback();
    });

    Given('a function type exists called {stringInDoubleQuotes}', function(function_type) {
        return this.db.one("insert into function_type (description) values ($1) returning id", [function_type])
            .then((data) => this.exisiting_web_preference_id = data.id);
    });

    When('I save the function type', function() {
        return this.axios
            .post("/", {
                "query": "mutation create_function_type($description : String!){  create_function_type( description : $description){ id }}",
                "variables": {
                    "description": this.function_type
                },
                "operationName": "create_function_type"
            })
            .then((response) => this.result = response);
    });

    When('I retrieve a list of functions', function() {
        return this.axios
            .post("/", {
                "query": "{ function_types {id,description}}",
                "variables": null,
                "operationName": null
            })
            .then((response) => this.result = response);
    });

    When('I update the function to {stringInDoubleQuotes},', function(web_preference) {
        return this.axios.post("/", {
                "query": "mutation update_function_type($id: ID!, $description : String!){  update_function_type( id: $id, description : $description){id description}}",
                "variables": {
                    "id": this.exisiting_web_preference_id,
                    "description": web_preference
                },
                "operationName": "update_function_type"
            })
            .then((response) => this.result = response);
    });

    When('I delete a function type', function() {
        return this.axios.post("/", {
                "query": "mutation delete_function_type($id: ID!){  delete_function_type( id: $id){id}}",
                "variables": {
                    "id": this.exisiting_web_preference_id,
                },
                "operationName": "delete_function_type"
            })
            .then((response) => this.result = response);
    });

    Then('the function type is in the database', function() {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.be.falsy;
        expect(this.result.data.data).to.exist;
        if (this.result.data.data.update_function_type) {
            expect(this.result.data.data.update_function_type.web_preference).to.exist;
            expect(this.result.data.data.update_function_type.errors).to.not.exist;
        } else {
            expect(this.result.data.data.create_function_type.id).to.exist;
            expect(this.result.data.data.create_function_type.errors).to.not.exist;
        }
        return this.db.one("select id, description from function_type where id = $1", [this.result.data.data.create_function_type.id])
            .then((data) => {
                console.log('data: ', data);
                expect(data.description).to.be.equal(this.function_type);
            })
    });

    Then('I get an error message about duplicate function types', function(callback) {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.exist;
        callback();
    });


    Then('the function list contains {stringInDoubleQuotes}', function(function_type, callback) {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.be.falsy;
        expect(this.result.data.data).to.exist;
        expect(this.result.data.data.function_types.map((d) => d.description)).to.include(function_type)
        callback();
    });

    Then('the function value in the database is {stringInDoubleQuotes}', function(web_preference_value) {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.be.falsy;
        expect(this.result.data.data).to.exist;
        return this.db.one("select id, description from function_type where id = $1", [this.exisiting_web_preference_id])
            .then((data) => {
                expect(data.description).to.be.equal(web_preference_value);
            });
    });

    Then('the function type called {stringInDoubleQuotes} does not exist', function(function_type) {
        expect(this.result.status).to.be.equal(200);
        expect(this.result.data.errors).to.be.falsy;
        expect(this.result.data.data).to.exist;
        return this.db.one("select id, description from function_type where id = $1", [this.exisiting_web_preference_id])
            .then((data) => {
                expect(data).to.not.be.ok;
            })
            .catch((error) => {
                expect(error.message).to.be.equal("No data returned from the query.");
            })
    });
});
