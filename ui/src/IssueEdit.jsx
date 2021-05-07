import React from 'react';

export default function IssueEdit({match}){
    const {id} = match.params;
    return (
        <h2>{`This is a place holder fro editing issue ${id}`}</h2>
    )
}