import React from 'react';
import { Table } from 'react-bootstrap';

const Blogs = () => {
  return (
    <div className="container">
      <h2>Blogs page.</h2>
      <h2>Difference between javascript and nodejs:</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>SN</th>
            <th>Javascript</th>
            <th>Node Js</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              Javascript is a programming language that is used for writing
              scripts on the website.{" "}
            </td>
            <td>NodeJS is a Javascript runtime environment.</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Javascript can only be run in the browsers.</td>
            <td>
              We can run Javascript outside the browser with the help of NodeJS.
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>It is basically used on the client-side.</td>
            <td>It is mostly used on the server-side.</td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              Javascript is capable enough to add HTML and play with the DOM.{" "}
            </td>
            <td>Nodejs does not have capability to add HTML tags.</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Javascript is used in frontend development.</td>
            <td>Nodejs is used in server-side development.</td>
          </tr>
        </tbody>
      </Table>
      <h2>Differences between Sql and noSql databases:</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>SN</th>
            <th>SQL</th>
            <th>NoSQL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>The full form of SQL is Structured Query Language.</td>
            <td>NoSQL stands for not only SQL.</td>
          </tr>
          <tr>
            <td>2</td>
            <td>These databases have fixed or static or predefined schema.</td>
            <td>They have dynamic schema.</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Relational database management.</td>
            <td>Non-relational or distributed database system.</td>
          </tr>
          <tr>
            <td>4</td>
            <td>These databases are best suited for complex queries.</td>
            <td>These databases are not so good for complex queries.</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Vertically Scalable.</td>
            <td>Horizontally scalable.</td>
          </tr>
        </tbody>
      </Table>
      <div>
        <h4>When should you use nodejs?</h4>
        <p>
          <span>Ans:</span>I will use nodejs to run javascript outside of
          browser and to run javascript in server side.
        </p>
        <h4>When should you use mongodb?</h4>
        <p>
          <span>Ans:</span>I will use mongodb when my data will be object
          centric and will not fit into the schema of a relational database,
          when i will need to accommodate massive scale and when i will need to
          prototyping rapidly etc.
        </p>
      </div>
    </div>
  );
};

export default Blogs;