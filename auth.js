const jwt = require("jsonwebtoken")

function authManager() {
    verify = (req, res, next) => {
        console.log("req: " + req);
        console.log("next: " + next);
        console.log("Who called verify?");
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, ':r(4[CaQ3`N<#8EV~7<K75Rd/ZpfzBkv`m-x]+QnjQcXazr%w;')
            console.log("verified.userId: " + verified.userId);
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized"
            });
        }
    }

    verifyUser = (req) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return null;
            }

            const decodedToken = jwt.verify(token, ':r(4[CaQ3`N<#8EV~7<K75Rd/ZpfzBkv`m-x]+QnjQcXazr%w;');
            return decodedToken.userId;
        } catch (err) {
            return null;
        }
    }

    signToken = (userId) => {
        return jwt.sign({
            userId: userId
        }, ':r(4[CaQ3`N<#8EV~7<K75Rd/ZpfzBkv`m-x]+QnjQcXazr%w;');
    }

    return this;
}

const auth = authManager();
module.exports = auth;