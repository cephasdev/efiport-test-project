const cors = require('cors');
const express = require('express');
const app = express();
const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/programs', (req, res) => {
    mongodb.MongoClient.connect(
        process.env.CONNECTIONSTRING,
        async function (err, client) {
            if (err) {
                console.log(err);
                res.json([]);
            }
            if (!client) {
                console.log('No client was found.');
                res.json([]);
            }
            const db = client.db();
            const programsCollection = db.collection('programs');
            const programs = await programsCollection.find().toArray();
            res.json(programs);
        }
    );
});

app.get('/api/researchareas', (req, res) => {
    mongodb.MongoClient.connect(
        process.env.CONNECTIONSTRING,
        async function (err, client) {
            const db = client.db();
            const researchAreasCollection = db.collection('research_areas');
            const researchAreas = await researchAreasCollection
                .find()
                .toArray();
            res.json(researchAreas);
        }
    );
});

app.get('/api/projects', (req, res) => {
    const projectsFromDb = [
        {
            title: 'Project 10001',
            program: 'Program 10001',
            isGroupProject: false
        },
        {
            title: 'Project 10002',
            program: 'Program 10002',
            isGroupProject: true
        }
    ];
    res.json(projectsFromDb);
});

app.get('/api/project/:id', (req, res) => {
    const foundProjectFromDb = {
        title: 'Project 10001',
        program: 'Program 10001',
        isGroupProject: false
    };
    res.json(foundProjectFromDb);
});

app.post('/api/project/new', (req, res) => {
    console.log('/api/project/new started');

    const projectData = {
        title: req.body.title,
        program: req.body.program,
        research_area: req.body.research_area,
        literature: req.body.literature,
        isgroupproject: req.body.isgroupproject,
        users: req.body.users
    };

    res.send(req.body);

    mongodb.MongoClient.connect(
        process.env.CONNECTIONSTRING,
        async function (err, client) {
            console.log('/api/project/new async db call started');
            const db = client.db();
            const projectsCollection = db.collection('projects');

            const projectData = {
                title: req.body.title,
                program: req.body.program,
                research_area: req.body.researchArea,
                literature: req.body.literature,
                isgroupproject: req.body.isGroupProject,
                users: req.body.users
            };
            await projectsCollection.insertOne(projectData);
            res.end('created new object.');
        }
    );
});

app.listen(process.env.APIPORT || 3001);
