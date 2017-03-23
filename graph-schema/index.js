import {
    buildSchema
} from 'graphql';

import moment from "moment";

import database from "../database";

var schema = buildSchema(`
type WebPreferenceType {
    id: ID!,
    description: String!
  }

type FunctionType {
    id: ID!,
    description: String!
  }

type Query {
  web_preference_types : [WebPreferenceType]
  function_types: [FunctionType]
}

type Mutation {
  create_web_preference_type(description:String! ) : WebPreferenceType
  update_web_preference_type(id: ID!, description: String!) : WebPreferenceType
  delete_web_preference_type(id: ID! ) : WebPreferenceType
  create_function_type(description:String! ) : FunctionType
  update_function_type(id: ID!, description: String!) : FunctionType
  delete_function_type(id: ID! ) : FunctionType
}
`);

var root = {
    web_preference_types: () => database.any("select id, description from web_preference_type"),
    create_web_preference_type: ({
            description
        }) => database
        .one("insert into web_preference_type (description) values ($1) returning id", [description])
        .then((data) => {
            return {
                id: data.id,
                description
            }
        }),

    create_web_preference_type: ({
            description
        }) => database
        .one("insert into web_preference_type (description) values ($1) returning id", [description])
        .then((data) => {
            return {
                id: data.id,
                description
            }
        }),

    update_web_preference_type: ({
            id,
            description
        }) => database
        .none("update web_preference_type set description = $1 where id =$2", [description, id])
        .then((data) => {
            return {
                id,
                description
            }
        }),

    delete_web_preference_type: ({
            id
        }) => database
        .none("delete from web_preference_type where id = $1", [id])
        .then(() => ({
            id,
            description: "none"
        })),

    function_types: () => database.any("select id, description from function_type"),

    create_function_type: ({
            description
        }) => database
        .one("insert into function_type (description) values ($1) returning id", [description])
        .then((data) => {
            return {
                id: data.id,
                description
            }
        }),

    update_function_type: ({
            id,
            description
        }) => database
        .none("update function_type set description = $1 where id =$2", [description, id])
        .then((data) => {
            return {
                id,
                description
            }
        }),

    delete_function_type: ({
            id
        }) => database
        .none("delete from function_type where id = $1", [id])
        .then(() => ({
            id,
            description: "none"
        })),
};

export {
    schema,
    root
};
