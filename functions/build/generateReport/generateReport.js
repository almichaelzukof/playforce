"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateReport = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _makePdf = require("./makePdf");

var functions = _interopRequireWildcard(require("firebase-functions"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', async (request, response) => {
  await (0, _makePdf.makePdf)(request.body, data => {
    response.setHeader('Content-disposition', 'attachment; filename=report.pdf');
    response.setHeader('Content-Type', 'application/pdf');
    response.send(data);
  });
});
const app = (0, _express.default)();
app.use((0, _cors.default)({
  origin: true
}));
app.use(_express.default.json());
app.use('/', router);
const generateReport = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`;
  }

  return app(request, response);
});
exports.generateReport = generateReport;