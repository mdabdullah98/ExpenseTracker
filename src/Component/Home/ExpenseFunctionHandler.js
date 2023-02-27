import styled from "styled-components";
const FunctionHandler = {
  Wrapper: styled.section`
    width: 90%;
    height: 100vh;
    margin: 0 auto;
    padding: 0.8rem;

    .welcome-profile-updatation {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid black;
      padding: 0.8rem 0.5rem;
      margin: 0.5rem 0;
    }
    .complete-profile {
      a {
        text-decoration: none;
        color: orangered;
      }
    }
    .button-group {
      width: 50%;
      display: flex;
      justify-content: space-between;
      button:nth-child(2) {
        margin-left: 0.5rem;
      }
    }

    .expense-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      grid-gap: 1rem;

      .expense_grid_child {
        label {
          width: 100%;
          text-transform: capitalize;
          font-weight: bold;
        }
        input,
        select {
          width: 100%;
          padding: 0.5rem;
          border: 0.5px solid lightgray;
          outline: none;
          margin: 0.5rem 0;
        }
      }
    }

    .expense-table {
      width: 100%;
      background: rgb(19, 25, 41);
      padding: 0.5rem;
      border-radius: 1rem;
      margin: 1rem 0;
      .box-1 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(5rem, 20rem));
        border-radius: 1rem;
        background: #fff;
        margin-top: 0.5rem;
        place-content: center;

        p {
          font-size: 1rem;
          margin: 0.3rem;
        }
      }
    }
  `,
};
export default FunctionHandler;
