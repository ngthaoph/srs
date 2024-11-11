import React from "react";

function NameResult({ firstName, lastName }) {
  return (
    <div>
      <table width="100%">
        <thead>
          <tr>
            <th rowspan="2">
              <a>Given Name</a>
            </th>
            <th rowspan="2">
              <a>Family Name</a>
            </th>
            <th rowspan="2">
              <a>Sex</a>
            </th>
            <th rowspan="2">
              <a>DOB</a>
            </th>
            <th rowspan="2">
              <a>Alias?</a>
            </th>
            <th>
              <a>
                Match <i></i>
              </a>
            </th>
            <th rowspan="2">
              <a></a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{firstName} </td>
            <td>{lastName}</td>
            <td>Female</td>
            <td>16/09/1991</td>
            <td>&nbsp;</td>
            <td>0</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <div data-total-count="1">
                <div></div>
                <div>1 to 1 of 1 results</div>
                <div>
                  <a>
                    <i></i>
                  </a>
                  <a>
                    <i></i>
                  </a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NameResult;
