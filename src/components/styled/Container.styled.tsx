"use client";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1512px;
  padding-inline: 40px;
  margin-inline: auto;
  ${({ theme }) => theme.bp.down("md")`
        padding-inline: 20px
    `};
`;

export default Container;
