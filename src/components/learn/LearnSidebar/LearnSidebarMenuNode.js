import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import OpenIcon from 'emotion-icons/octicons/ChevronDown';
import CloseIcon from 'emotion-icons/octicons/ChevronRight';

import config from '../../../../config';
import Icon from '../../Icon';
import SidebarMenuItem from '../../Sidebar/SidebarMenuItem';
import capitalize from '../../../utils/capitalize';
import removeStartEndSlugSlash from "../../../utils/removeStartEndSlugSlash";

const NodeLink = styled(SidebarMenuItem)`
  padding-left: 1rem;
  margin-left: 0;
`;

const NodeList = styled.ul`
  border-left: 1px solid
    ${props =>
      (props.deepLevel >= 0 ? props.theme.colors.accentBackground : 'inherit')};
  margin-left: ${props => (props.deepLevel >= 0 ? '1.4rem' : '0')};
  padding-left: 0;
`;

const ButtonChevron = styled.button`
  background: transparent;
  border: 0;
  margin-left: auto;
`;

// eslint-disable-next-line complexity
const LearnSidebarMenuNode = ({
  setCollapsed,
  collapsed,
  url,
  title,
  name,
  nodes,
  deepLevel,
  location,
}) => {
  const isCollapsed = collapsed[url];
  const collapse = () => {
    setCollapsed(url);
  };
  const hasChildren = nodes.length !== 0;
  const trimmedUrl = removeStartEndSlugSlash(url);
  const trimmedPathname = removeStartEndSlugSlash(location.pathname);
  const isActive =
    location &&
    (trimmedPathname === trimmedUrl ||
      trimmedPathname === config.gatsby.pathPrefix + trimmedUrl);
  const isActivePath = location && trimmedPathname.match(trimmedUrl);

  const isDirectoryNode = nodes && nodes[0] ? nodes[0].url === url : false;
  const directoryTitle = capitalize(name);
  return (
    <div>
      {title && (
        <NodeLink
          deepLevel={deepLevel}
          isActive={isActive ? '1' : undefined}
          isActivePath={isActivePath ? '1' : undefined}
          onClick={collapse}
          to={url}
        >
          {isDirectoryNode ? directoryTitle : title}
          {hasChildren && (
            <ButtonChevron type="button" onClick={collapse}>
              {!isCollapsed ? (
                <Icon icon={OpenIcon} size={16} />
              ) : (
                <Icon icon={CloseIcon} size={16} />
              )}
            </ButtonChevron>
          )}
        </NodeLink>
      )}

      {!isCollapsed && hasChildren ? (
        <NodeList deepLevel={deepLevel}>
          {nodes.map(item => (
            <LearnSidebarMenuNode
              location={location}
              key={item.url}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              title={item.title}
              name={item.name}
              url={item.url}
              deepLevel={item.deepLevel}
              nodes={item.nodes}
            />
          ))}
        </NodeList>
      ) : null}
    </div>
  );
};

LearnSidebarMenuNode.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string,
  collapsed: PropTypes.shape({}).isRequired,
  deepLevel: PropTypes.number.isRequired,
  url: PropTypes.string,
  name: PropTypes.string,
  setCollapsed: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

LearnSidebarMenuNode.defaultProps = {
  url: '',
  title: '',
  name: '',
};

export default LearnSidebarMenuNode;