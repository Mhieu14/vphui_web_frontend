/**
 * All available routes for the app
 */

export const HOME = '/';

export const FORGOT_PASSWORD = '/forgot-password';

export const RESET_PASSWORD = '/reset-password';

export const USER_PROFILE = '/:username';

export const EXPLORE = '/explore';

export const PEOPLE = '/people';

// teams
export const TEAMS = '/teams';
export const TEAM_PROFILE = '/team-profile/:teamname';

export const STADIUMS = '/stadiums';

// matchup
export const MATCHUPHOME = '/matchup';
export const MATCHUP_ATTENTION = '/matchup/attention';
export const MATCHUP_SUGGEST = '/matchup/suggest';
export const MATCHUP_DETAIL = '/matchup/detail/:id';

export const MATCH = '/match';

export const san1 = 'https://www.google.com/maps'

export const NOTIFICATIONS = '/notifications';

export const MESSAGES = '/messages/:userId';

export const POST = '/post/:id';

/**
 * Value that's used in place of id when creating something new.
 */
export const NEW_ID_VALUE = 'new';
