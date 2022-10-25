

import React, { useState } from 'react'
import TopNavigation from './TopNavigation';
import TableGenerator from './TableGenerator';
import BookshelfGenerator from './BookshelfGenerator';
import Container from 'react-bootstrap/Container';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TableGenerator />,
  },
  {
    path: "/bookself",
    element: <BookshelfGenerator />,
  },
  {
    path: "/table",
    element: <TableGenerator />,
  },
]);

export default function App() {
  return (
    <div>
      <TopNavigation />
      <Container>

      <TableGenerator />
      </Container>
    </div>
  )
}
