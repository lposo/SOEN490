import { Box, Container } from '@material-ui/core';
import React, { Component } from 'react';

import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm';

export const AdminPageView = () => {
    return (
        <select>
            <option value="grapefruit">Dataset list</option>
            <option value="lime"></option>
            <option selected value="coconut"></option>
            <option value="mango"></option>
        </select>
    )

}