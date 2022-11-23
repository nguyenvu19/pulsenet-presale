import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Box, Flex } from "../../../../components/Box";
import { ChevronDownIcon } from "../../../../components/Svg";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";
import { UserMenuItem } from "./styles";

const WStyledUserMenu = styled(Flex)``;
export const StyledUserMenu = styled(Flex)<{ isLeft?: boolean }>`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  width: ${({ isLeft }) => (isLeft ? "86px" : "140px")};
  height: 44px;
  padding: 4px 8px;
  padding-left: ${({ isLeft }) => (isLeft ? "56px" : "40px")};
  margin-left: ${({ isLeft }) => (isLeft ? "0" : "-42px")};
  position: relative;

  border-radius: ${({ isLeft }) => (isLeft ? "12px 0 0 12px" : "0 12px 12px 0")};

  background-image: ${({ isLeft }) => (isLeft ? 'url("/images/button-left.png")' : 'url("/images/button-right.png")')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: ${({ isLeft }) => (isLeft ? " right center" : "left  center")};

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 288px;
  }

  .switch-icon {
    width: 38px;
    height: 38px;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
`;

export const LabelText = styled.div<{ isLeft?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  display: ${({ isLeft }) => (isLeft ? "none" : "block")};
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 280px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  avatarSrc,
  isLeft,
  variant = variants.DEFAULT,
  children,
  disabled,
  placement = "bottom-end",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null;
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: "fixed",
    placement,
    modifiers: [{ name: "offset", options: { offset: [0, -56] } }],
  });

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);

  return (
    <WStyledUserMenu alignItems="center" height="100%" ref={setTargetRef} {...props}>
      <StyledUserMenu
        isLeft={isLeft}
        onTouchStart={() => {
          setIsOpen((s) => !s);
        }}
      >
        {isLeft && <img className="switch-icon" src={avatarSrc} alt="" />}
        <LabelText isLeft={isLeft} title={typeof text === "string" ? text || account : account}>
          {text || accountEllipsis ? accountEllipsis : "Connect"}
        </LabelText>
        {/* {!disabled && <ChevronDownIcon color="text" width="24px" />} */}
      </StyledUserMenu>
      {!disabled && (
        <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          <Box onClick={() => setIsOpen(false)}>{children?.({ isOpen })}</Box>
        </Menu>
      )}
    </WStyledUserMenu>
  );
};

export default UserMenu;
