import {css} from '@linaria/core'
// import {spacing} from '@logistics-frontend/blocks/theme/theme'

export const classes = {
  accordion: css`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
  `,
  summary: css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 56px;
    padding: 0;
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
  `,
  expandIcon: css`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    transform: rotate(0deg);
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  `,
  iconExpanded: css`
    transform: rotate(180deg);
  `,
  details: css`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 450ms ease-in;

    & * {
      width: 100%;
    }
    `,
  detailsExpanded: css`
    max-height: 200px;
    border-top: 1px solid #d2d0cc;
  `,
}
