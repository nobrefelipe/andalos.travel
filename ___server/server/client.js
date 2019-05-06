import { GraphQLClient } from 'graphql-request';

// const token = localStorage.getItem('token');
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTM0MzY4NjQsImNsaWVudElkIjoiY2p0bXpuY3NpMG40YjAxNjdkZHdneXF1OCJ9.zC4kylGVBBDr3VI80DNosErRVbwJ431jvCCLwIm4Hpc";

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjtmzsfb01eyx0101gd3m8hyx', {
    headers: {
        Authorization:  token ? `Bearer ${token}` : null
    },
});

export default client;