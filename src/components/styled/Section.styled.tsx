import styled from "styled-components";

const Section = styled.section`
  ${({ theme }) => theme.bp.down("md")`
    `}
  ${({ theme }) => theme.bp.down("sm")`
`}
`;
export default Section;
