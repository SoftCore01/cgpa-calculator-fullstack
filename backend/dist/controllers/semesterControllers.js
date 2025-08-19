var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import db from "../utils/db.js";
import { semestersSchema } from "../middlewares/validator.js";
export const readSemestersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        /* const user = req.session.user; */
        console.log("read");
        const existingUser = db.find((user) => user.email === req.session.user.email);
        if (existingUser) {
            return res.json({
                success: true,
                message: "Semesters retrieved successfully",
                data: existingUser.sesmesters,
            });
        }
    }
    return res.status(401).json({ success: false, message: "Unauthorized" });
});
export const deleteSemestersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        /* const user = req.session.user; */
        const userIndex = db.findIndex((user) => user.email === req.session.user.email);
        const newUser = db[userIndex];
        newUser.sesmesters = [];
        req.session.user = newUser;
        db.splice(userIndex, 1, newUser);
        return res.json({
            success: true,
            message: "Semesters deleted successfully",
        });
    }
    return res.status(401).json({ success: false, message: "Unauthorized" });
});
export const updateSemestersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.user) {
        const { semesters } = req.body;
        const { error, value } = semestersSchema.validate({
            semesters,
        });
        if (error)
            return (res
                /*         .status(401) */
                .json({ success: false, message: error.details[0].message }));
        const userIndex = db.findIndex((user) => user.email === req.session.user.email);
        const newUser = db[userIndex];
        newUser.sesmesters = semesters;
        req.session.user = newUser;
        db.splice(userIndex, 1, newUser);
        return res.json({
            success: true,
            message: "Semesters updated successfully",
        });
    }
    return res.status(401).json({ success: false, message: "Unauthorized" });
});
