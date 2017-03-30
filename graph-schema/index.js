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

type WebContentRoleType {
    id: ID!,
    description: String!
  }

type WebContentStatusType {
    id: ID!,
    description: String!
  }


type WebContentType {
    id: ID!,
    description: String!
  }

type Query {
  web_preference_types : [WebPreferenceType]
  function_types: [FunctionType]
  web_content_role_types: [WebContentRoleType]
  web_content_status_types: [WebContentStatusType]
  web_content_types: [WebContentType]
}

type Mutation {
  create_web_preference_type(description:String! ) : WebPreferenceType
  update_web_preference_type(id: ID!, description: String!) : WebPreferenceType
  delete_web_preference_type(id: ID! ) : WebPreferenceType
  create_function_type(description:String! ) : FunctionType
  update_function_type(id: ID!, description: String!) : FunctionType
  delete_function_type(id: ID! ) : FunctionType
  create_web_content_role_type(description:String! ) : WebContentRoleType
  update_web_content_role_type(id: ID!, description: String!) : WebContentRoleType
  delete_web_content_role_type(id: ID! ) : WebContentRoleType
  create_web_content_status_type(description:String! ) : WebContentStatusType
  update_web_content_status_type(id: ID!, description: String!) : WebContentStatusType
  delete_web_content_status_type(id: ID! ) : WebContentStatusType
  create_web_content_type(description:String! ) : WebContentType
  update_web_content_type(id: ID!, description: String!) : WebContentType
  delete_web_content_type(id: ID! ) : WebContentType
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

    web_content_role_types: () => database.any("select id, description from web_content_role_type"),

    create_web_content_role_type: ({
            description
        }) => database
        .one("insert into web_content_role_type (description) values ($1) returning id", [description])
        .then((data) => {
            return {
                id: data.id,
                description
            }
        }),

    update_web_content_role_type: ({
            id,
            description
        }) => database
        .none("update web_content_role_type set description = $1 where id =$2", [description, id])
        .then((data) => {
            return {
                id,
                description
            }
        }),

    delete_web_content_role_type: ({
            id
        }) => database
        .none("delete from web_content_role_type where id = $1", [id])
        .then(() => ({
            id,
            description: "none"
        })),

    web_content_types: () => database.any("select id, description from web_content_type"),

    web_content_status_types: () => database.any("select id, description from web_content_status_type"),

    create_web_content_status_type: ({
            description
        }) => database
        .one("insert into web_content_status_type (description) values ($1) returning id", [description])
        .then((data) => {
            return {
                id: data.id,
                description
            }
        }),

    update_web_content_status_type: ({
            id,
            description
        }) => database
        .none("update web_content_status_type set description = $1 where id =$2", [description, id])
        .then((data) => {
            return {
                id,
                description
            }
        }),

    delete_web_content_status_type: ({
            id
        }) => database
        .none("delete from web_content_status_type where id = $1", [id])
        .then(() => ({
            id,
            description: "none"
        })),

    web_content_types: () => database.any("select id, description from web_content_type"),

    create_web_content_type: ({
            description
        }) => database
        .one("insert into web_content_type (description) values ($1) returning id", [description])
        .then((data) => {
            return {
                id: data.id,
                description
            }
        }),

    update_web_content_type: ({
            id,
            description
        }) => database
        .none("update web_content_type set description = $1 where id =$2", [description, id])
        .then((data) => {
            return {
                id,
                description
            }
        }),

    delete_web_content_type: ({
            id
        }) => database
        .none("delete from web_content_type where id = $1", [id])
        .then(() => ({
            id,
            description: "none"
        })),
};

export {
    schema,
    root
};
