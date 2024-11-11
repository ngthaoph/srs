import styled from "styled-components";

export const StyledMainContent = styled.div`
  width: 98%;
  margin: 10px 5px 2px 10px;
  padding-left: 160px;
`;
export const StyledTopPanel = styled.div``;

export const StyledFormInline = styled.div`
  .fieldset {
    float: left;
    clear: none;
    margin-right: 5px;

    &.no_label {
      margin-right: 0;
    }

    .viewfield,
    label {
      width: auto;
    }

    label.heading {
      font-weight: 700;
    }
  }

  .clear {
    clear: both;
  }

  .search_form {
    clear: both;
    padding: 5px 0;

    input[type="text"] {
      width: 150px;
    }
  }
`;
