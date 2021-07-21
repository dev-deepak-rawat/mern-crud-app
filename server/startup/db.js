const mongoose = require('mongoose');

module.exports = function () {
    const mongoAtlasUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@userdetailscluster.bwj5v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

    mongoose.connect(mongoAtlasUri
        , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then((res) => console.log('Connected to MongoDb...'));
};
