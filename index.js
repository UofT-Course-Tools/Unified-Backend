const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const courses = require('./schema');
var mongoose = require('mongoose');

const typeDefs = gql`
    type Query {
    hello: String
     }
    `;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};



var Schema = mongoose.Schema;

var Courses = new Schema({
  id:  String, // String is shorthand for {type: String}
  code: String,
  description:   String,
  division: [{ body: String, date: Date }],
  department: { type: Date, default: Date.now },
  prerequisites: Boolean,
  exclusions:  String, // String is shorthand for {type: String}
  level: number,
  campus:  String, // String is shorthand for {type: String}
  term: String,
  Breadths: Array,
  meeting_sections: Array[sections]
  
});

//  async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


async function main() {
    /**
     * Still have to change the password to make it more secure (with the key)
     */

    const uri = "mongodb+srv://user_1:coursetools@coursetoolscluster-wjb51.mongodb.net/test?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    var database = mongoose.connection;
    database.on('error', console.error.bind(console, 'connection error:'));
    database.once('open', function () {
        console.log('connected');
        database.db.collection("Courses", function (err, collections) {
            collections.find({}).toArray(function (err, data) {
                console.log(data); // it will print your collection data
            })
        });





    });




    // try {
    //     // Connect to the MongoDB cluster
    //     await client.connect();

    //     // Make the appropriate DB calls
    //     await  listDatabases(client);

    // } catch (e) {
    //     console.error(e);
    // } finally {
    //     await client.close();
    // }
}

main().catch(console.error);









// const server = new ApolloServer({ typeDefs, resolvers });

// const app = express();
// server.applyMiddleware({ app });

// app.listen({ port: 4000 }, () =>
//     console.log('Now browse to http://localhost:4000' + server.graphqlPath)
// );