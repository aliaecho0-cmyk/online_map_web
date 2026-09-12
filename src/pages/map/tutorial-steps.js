/** pages/map/tutorial-steps.js — 新手指引步骤配置（web 版） */
import { isEnglish, t } from '../../i18n.js';

const TUTORIAL_KEY = 'campus_map_tutorial_v1_completed';
const EXAMPLE_BOOTH_ID = '20';
const SOCIAL_UNION = { mapX: 12, mapY: 20 };

function getSteps() {
  const messages = isEnglish()
    ? [
        'Before you begin, collect the event guide and fan from the Student Association booth.',
        'Tap a light-green booth marker to see that club’s activity information.',
        'The club profile and activity rules appear here.',
        'Use Map to see booth locations and the overall layout.',
        'Use Clubs to browse every participating club.',
        'Use Events to see what is happening during the Clubs Fair.',
      ]
    : [
        '参加活动前，请先到社联处领取活动手册和小扇子～',
        '点击地图上的浅绿色摊位格，可以查看该社团的具体活动信息。',
        '活动时间、地点和活动介绍都会显示在这里。',
        '在“地图”中查看社团摊位的位置和分布。',
        '在“社团”中浏览所有参展社团。',
        '在“活动”中查看百团大战期间的精彩活动。',
      ];
  const targets = ['socialUnion', 'clubMarker', 'clubPopup', 'tabMap', 'tabClub', 'tabActivity'];
  const keys = ['union_location', 'club_marker', 'club_popup', 'tab_map', 'tab_club', 'tab_activity'];
  return messages.map((message, index) => ({
    key: keys[index],
    target: targets[index],
    message,
    button: index === messages.length - 1 ? t('complete') : t('next'),
  }));
}

const STATE = {
  INACTIVE: 'inactive',
  UNION_LOCATION: 'union_location',
  CLUB_MARKER: 'club_marker',
  CLUB_POPUP: 'club_popup',
  TAB_MAP: 'tab_map',
  TAB_CLUB: 'tab_club',
  TAB_ACTIVITY: 'tab_activity',
  COMPLETED: 'completed',
};

export { TUTORIAL_KEY, EXAMPLE_BOOTH_ID, SOCIAL_UNION, getSteps, STATE };
