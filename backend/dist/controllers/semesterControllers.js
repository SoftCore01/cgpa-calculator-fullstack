var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { semestersSchema } from "../middlewares/validator.js";
import { User } from "../models/usersModel.js";
export const readSemestersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    if (user) {
        /* const user = req.session.user; */
        const existingUser = yield User.findOne({ email: user.email });
        if (existingUser) {
            return res.json({
                success: true,
                message: "Semesters retrieved successfully",
                data: existingUser.semesters,
            });
        }
    }
    return res.status(401).json({ success: false, message: "Unauthorized" });
});
export const deleteSemestersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    if (user) {
        /* const user = req.session.user; */
        const existingUser = yield User.findOne({ email: user.email });
        if (existingUser) {
            const newSemester = [];
            existingUser.semesters = [];
            return res.json({
                success: true,
                message: "Semesters deleted successfully",
            });
        }
    }
    return res.status(401).json({ success: false, message: "Unauthorized" });
});
export const updateSemestersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.session.user;
    if (user) {
        const { semesters } = req.body;
        const { error, value } = semestersSchema.validate({
            semesters,
        });
        console.log(semesters);
        if (error)
            return (res
                /*         .status(401) */
                .json({ success: false, message: error.details[0].message }));
        const existingUser = yield User.findOne({ email: user.email });
        if (existingUser) {
            existingUser.semesters = semesters;
            yield existingUser.save();
            return res.json({
                success: true,
                message: "Semesters deleted successfully",
            });
        }
    }
    return res.status(401).json({ success: false, message: "Unauthorized" });
});
