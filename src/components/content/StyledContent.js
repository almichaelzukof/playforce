import Styled from 'styled-components'

export const StyledContent = Styled.div`
  padding: 16px;

  @media (min-width: 600px) {
    width: ${({ theme }) => theme.lanscapeWidth};
    min-width: 600px;
    margin: 0 auto;
  }

  /* @media screen and (orientation: landscape) {
    width: ${({ theme }) => theme.lanscapeWidth};
    margin: 0 auto;
  } */
`
