const express = require("express");
const userModel = require("./models/userModel");
const sitModel = require("./models/sitModel");
const app = express();


/**
 * @swagger
 * /add_user:
 *   post:
 *     summary: Create a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */

app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);

    try {
        const userId = request.body.id;
        const existingUser = await userModel.findOne({id: userId});
        if (!existingUser) {
            user.createdAt = new Date();
            await user.save();
            response.send(user);
        } else
            response.status(500).send("User with this id already exist");
    } catch (error) {
        response.status(500).send(error);
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve the list of existing users.
 *     description: Can be used to check if your users have been created successfully.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
app.get("/users", async (request, response) => {
    const users = await userModel.find({});

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

// API to check username availability
app.get("/check-username/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const existingUser = await userModel.findOne({username: username});
        res.send(!!existingUser);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/find/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const existingUser = await userModel.findOne({username: username});
        res.send(existingUser ? existingUser : "null");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/findById/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const existingUser = await userModel.findOne({id: userId});
        res.send(existingUser ? existingUser : "null");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/delete/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await userModel.findByIdAndDelete(userId, {
            new: true,
        });
        res.send(updatedUser);
    } catch (err) {
        res.status(500).send(err);
    }
});

// API to update user data
app.patch("/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const existingUser = await userModel.findOne({id: userId});
        const updates = req.body;
        if (!existingUser)
            res.send("User with this id doesn't exist");
        else {
            Object.keys(updates).forEach((key) => {
                existingUser[key] = updates[key];
            });
            existingUser.updatedAt = new Date();
            const updatedUser = await existingUser.save();
            res.send(updatedUser);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// API to update user theme and accent
app.patch("/users/:userId/theme", async (req, res) => {
    try {
        const userId = req.params.userId;
        const {theme, accent} = req.body;
        const existingUser = await userModel.findOne({id: userId});
        if (!existingUser)
            res.send("User with this id doesn't exist");
        else {
            const updatedUser = await userModel.findByIdAndUpdate(
                existingUser._id,
                {theme, accent},
                {
                    new: true,
                }
            );
            res.send(updatedUser);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// API to update username
app.patch("/users/:userId/username", async (req, res) => {
    try {
        const userId = req.params.userId;
        const {username} = req.body;
        const existingUser = await userModel.findOne({username: username});
        if (existingUser) {
            res.status(400).send("Username already exists");
        } else {
            const existingUser = await userModel.findOne({id: userId});
            if (!existingUser)
                res.send("User with this id doesn't exist");
            else {
                const updatedUser = await userModel.findByIdAndUpdate(
                    existingUser._id,
                    {username, updatedAt: new Date()},
                    {
                        new: true,
                    }
                );
                res.send(updatedUser);
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /add_user:
 *   post:
 *     summary: Create a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */

app.post("/add_sit", async (request, response) => {
    const sit = new sitModel(request.body);

    try {
        sit.createdAt = new Date();
        await sit.save();
        response.send(sit);
    } catch (error) {
        response.status(500).send(error);
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve the list of existing users.
 *     description: Can be used to check if your users have been created successfully.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
app.get("/sits", async (request, response) => {
    const {parentId, createdBy, parent, userResits} = request.query;
    let query = {};

    if (parentId) {
        query = {'parent.id': parentId};
    }

    if (createdBy) {
        query = {...query, 'createdBy': createdBy};
    }

    if (parent) {
        query = {...query, 'parent': null};
    }

    if (userResits) {
        query = {...query, 'userResits': userResits};
    }

    const result = await sitModel.find(query)
        .sort({createdAt: 'desc'})
        .exec();

    response.send(result);
});

app.get("/sits/people/:createdBy", async (request, response) => {
    const createdBy = request.params.createdBy;
    const existingSits = await sitModel.find({}).sort({createdAt: 'desc'})
        .exec();

    const result = existingSits.filter((element) => element.createdBy !== createdBy && !element.userResits.includes(createdBy));

    response.send(result);
});

app.get("/sits/liked/:createdBy", async (request, response) => {
    const createdBy = request.params.createdBy;
    const existingSits = await sitModel.find({}).sort({createdAt: 'desc'})
        .exec();

    const result = existingSits.filter((element) => element.userLikes.includes(createdBy));

    response.send(result);
});

app.get("/sits/media/:createdBy", async (request, response) => {
    const createdBy = request.params.createdBy;
    const existingSits = await sitModel.find({}).sort({createdAt: 'desc'})
        .exec();

    const result = existingSits.filter((element) => element.images !== null);

    response.send(result);
});

app.get("/sits/:sitId", async (request, response) => {
    try {
        const sitId = request.params.sitId;
        const existingSit = await sitModel.findById(sitId);
        response.send(existingSit ? existingSit : "null");
    } catch (err) {
        console.log('error: ', err);
        response.status(500).send(err);
    }
});

app.delete("/sits/delete/:sitId", async (req, res) => {
    try {
        const sitId = req.params.sitId;
        const deletedSit = await sitModel.findByIdAndDelete(sitId, {
            new: true,
        });
        res.send(deletedSit);
    } catch (err) {
        res.status(500).send(err);
    }
});

// API to update user data
app.patch("/sits/:sitId", async (req, res) => {
    try {
        const sitId = req.params.sitId;
        const existingSit = await sitModel.findById(sitId);
        const updates = req.body;
        if (!existingSit)
            res.send("Sit with this id doesn't exist");
        else {
            Object.keys(updates).forEach((key) => {
                existingSit[key] = updates[key];
            });
            existingSit.updatedAt = new Date();
            const updatedSit = await existingSit.save();
            res.send(updatedSit);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.patch("/sits/:sitId/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const sitId = req.params.sitId;
        const existingSit = await sitModel.findById(sitId);
        if (!existingSit)
            res.send("Sit with this id doesn't exist");
        else {
            if (!existingSit.userResits.includes(userId))
                existingSit.userResits.push(userId);
            else
                existingSit.userResits = existingSit.userResits.filter((element) => element !== userId);

            existingSit.updatedAt = new Date();
            const updatedSit = await existingSit.save();
            res.send(updatedSit);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.patch("/users/:userId/:sitId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const sitId = req.params.sitId;
        const existingUser = await userModel.findOne({id: userId});
        if (!existingUser)
            res.send("User with this id doesn't exist");
        else {
            if (!existingUser.stats.sits.includes(sitId))
                existingUser.stats.sits.push(sitId);
            else
                existingUser.stats.sits = existingUser.stats.sits.filter((element) => element !== sitId);
            existingUser.updatedAt = new Date();
            const updatedUser = await existingUser.save();
            res.send(updatedUser);
        }
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send(err);
    }
});

app.patch("/sits/like/:sitId/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const sitId = req.params.sitId;
        const existingSit = await sitModel.findById(sitId);
        if (!existingSit)
            res.send("Sit with this id doesn't exist");
        else {
            if (!existingSit.userLikes.includes(userId))
                existingSit.userLikes.push(userId);
            else
                existingSit.userLikes = existingSit.userLikes.filter((element) => element !== userId);

            existingSit.updatedAt = new Date();
            const updatedSit = await existingSit.save();
            res.send(updatedSit);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.patch("/users/like/:userId/:sitId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const sitId = req.params.sitId;
        const existingUser = await userModel.findOne({id: userId});
        if (!existingUser)
            res.send("User with this id doesn't exist");
        else {
            if (!existingUser.stats.likes.includes(sitId))
                existingUser.stats.likes.push(sitId);
            else
                existingUser.stats.likes = existingUser.stats.likes.filter((element) => element !== sitId);
            existingUser.updatedAt = new Date();
            const updatedUser = await existingUser.save();
            res.send(updatedUser);
        }
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send(err);
    }
});

app.post("/users/bookmark/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const body = req.body;
        const existingUser = await userModel.findOne({id: userId});
        if (!existingUser)
            res.send("User with this id doesn't exist");
        else {
            if (!existingUser.bookmarks.includes(body))
                existingUser.bookmarks.push(body);
            else
                existingUser.bookmarks = existingUser.bookmarks.filter((element) => element !== body);
            existingUser.updatedAt = new Date();
            console.log('Updated User: ', existingUser);
            const updatedUser = await existingUser.save();
            res.send(updatedUser);
        }
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send(err);
    }
});

app.get("/users/bookmark/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const body = req.body;
        const existingUser = await userModel.findOne({id: userId});
        if (!existingUser)
            res.send("User with this id doesn't exist");
        else {
            console.log('Bookmarks: ', existingUser.bookmarks);
            res.send(existingUser.bookmarks);
        }
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send(err);
    }
});

app.patch("/users/bookmark/:userId/clearAll", async (req, res) => {
    try {
        const userId = req.params.userId;
        const existingUser = await userModel.findOne({id: userId});
        if (!existingUser)
            res.send("User with this id doesn't exist");
        else {
            while (existingUser.bookmarks.length > 0) {
                existingUser.bookmarks.splice(0, 1);
            }
            existingUser.updatedAt = new Date();
            const updatedUser = await existingUser.save();
            res.send(updatedUser);
        }
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send(err);
    }
});

module.exports = app;
