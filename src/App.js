

import React, { useState } from 'react'
import TopNavigation from './TopNavigation';
import TableGenerator from './TableGenerator';
import Container from 'react-bootstrap/Container';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import 'bootswatch/dist/darkly/bootstrap.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TableGenerator />,
  },
]);

export default function App() {
  return (
    <div>
      <TopNavigation />
      <Container fluid>

      <TableGenerator />
      </Container>
    </div>
  )
}
