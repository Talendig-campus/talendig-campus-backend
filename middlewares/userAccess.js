
const isAdmin = async (req, res, next) => {
    
    try {
        const isAdmin = req.user?.accessLevel?.name.toLowerCase() || null;

        if (isAdmin && isAdmin === "admin") {

            next();

        } else {

            return res.status(401).json({message:'No authorized', error: error.message});
        }

    } catch (error) {
        return res.status(401).json({message:'No authorized', error: error.message});
    }
}

const isInstructor = async (req, res, next) => {
    
    try {
        console.log(req.user);
        const isInstuctor = req.user?.accessLevel?.name.toLowerCase() || null;

        if (isInstuctor && isInstuctor === "instructor") {

            next();

        } else {

            return res.status(401).json({message:'No authorized', error: error.message});
        }

    } catch (error) {
        return res.status(401).json({message:'No authorized', error: error.message});
    }
}

const isRecruiter = async (req, res, next) => {
    
    try {
        const isRecruiter = req.user?.accessLevel?.name.toLowerCase() || null;

        if (isRecruiter && isRecruiter === "recruiter") {

            next();

        } else {

            return res.status(401).json({message:'No authorized', error: error.message});
        }

    } catch (error) {
        return res.status(401).json({message:'No authorized', error: error.message});
    }
}

module.exports = {
    isAdmin,
    isInstructor,
    isRecruiter
};