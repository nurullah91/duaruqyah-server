const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const port = process.env.PORT || 5000;
const cors = require('cors');
const app = express();

