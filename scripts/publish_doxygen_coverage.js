#!/usr/bin/env node

const jwt = require('jsonwebtoken');
const github = require('@octokit/rest')();
const fs = require('fs');

const SIZE_CHECK_APP_ID = 14028;
const SIZE_CHECK_APP_INSTALLATION_ID = 229425;

const coverage = JSON.parse(fs.readFileSync(process.argv[2]));

process.on('unhandledRejection', error => {
    console.log(error);
    process.exit(1)
});

const pk = process.env['SIZE_CHECK_APP_PRIVATE_KEY'];
if (!pk) {
    console.log('Fork PR; not publishing size.');
    process.exit(0);
}

const key = Buffer.from(pk, 'base64').toString('binary');
const payload = {
    exp: Math.floor(Date.now() / 1000) + 60,
    iat: Math.floor(Date.now() / 1000),
    iss: SIZE_CHECK_APP_ID
};

const token = jwt.sign(payload, key, {algorithm: 'RS256'});
github.authenticate({type: 'app', token});

github.apps.createInstallationToken({installation_id: SIZE_CHECK_APP_INSTALLATION_ID})
    .then(({data}) => {
        github.authenticate({type: 'token', token: data.token});
        const percentage = coverage.documented * 100 / coverage.total;
        const title = `${percentage}%`;

        return github.checks.create({
            owner: 'mapbox',
            repo: 'mapbox-gl-native',
            name: 'Doxygen coverage',
            head_branch: process.env['CIRCLE_BRANCH'],
            head_sha: process.env['CIRCLE_SHA1'],
            status: 'completed',
            conclusion: 'success',
            completed_at: new Date().toISOString(),
            output: {
                title,
                summary: `There is doxygen documentation for ${percentage}% of the public symbols (${coverage.documented} out of ${coverage.total})`
            }
        });
    });