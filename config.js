'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/domionion-app';
exports.TEST_DATABASE_URL || 'mongodb://localhost/test-dominion-app';
exports.PORT = process.env.PORT || 8080;