const server = require('express').Router();
const { Product, Category, Image, User, Request } = require('../db.js');
const Sequelize = require('sequelize');
const { request } = require('express');
const Op = Sequelize.Op;

// Get all requests or get request by status
server.get('/', async (req, res) => {
    let { status } = req.query;
    try {
        if (status) {
            const requestsWithStatus = await Request.findAll({
                where: {
                    state: status
                },
                include: [{ model: User }],
                attributes: [
                    "id",
                    "cv",
                    "links",
                    "fundament",
                    "state"
                ]
            })
            if (requestsWithStatus.length > 0) {
                res.json(requestsWithStatus)
            } else {
                res.json(`Could not get requests with status ${status}`)
            }
        } else {
            const allRequests = await Request.findAll({
                include: [{ model: User }],
                attributes: [
                    "id",
                    "cv",
                    "links",
                    "fundament",
                    "state"
                ]
            })
            if (allRequests.length > 0) {
                res.send(allRequests)
            } else {
                res.json({ message: 'Could not get requests' })
            }
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
});

// Get request by id
server.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        const found = await Request.findOne({
            where: {
                id
            },
            include: [{ model: User }],
            attributes: [
                "id",
                "cv",
                "links",
                "fundament",
                "state"
            ]
        })
        if (!found) {
            res.json(`Could not get request with id ${id}`)
        } else {
            res.json(found)
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
});

// Create request
server.post('/:id', async (req, res) => {
    let { id } = req.params;
    let { cv, links, fundament } = req.body;
    try {
        const newRequest = await Request.create({
            cv,
            links,
            fundament,
            state: 'pending',
            userId: id
        })
        res.json(newRequest)
    }
    catch (err) {
        res.status(400).send(err)
    }
});

// Change request state
server.put('/:idRequest', async (req, res) => {
    let { idRequest } = req.params;
    let { state: newState } = req.body;

    try {
        const requestToEdit = await Request.findOne({
            where: {
                id: idRequest
            },
            include: [{ model: User }],
        })
        if (requestToEdit) {
            if (newState === 'approved') {

                await User.findByPk(requestToEdit.user.id)
                    .then((user) => {
                        user.type = 'artist',
                            user.save()
                    })
            }

            await Request.findByPk(idRequest)
                .then((request) => {
                    request.state = newState,
                        request.save()
                })

            res.json(`Request with id ${idRequest} succesfully modified`)
        } else {
            res.send(`Could not find request with id: ${idRequest}`)
        }

    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
});


module.exports = server;