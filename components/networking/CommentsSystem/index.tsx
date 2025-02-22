import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ForumIcon from '@mui/icons-material/Forum';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import { callApi } from '../../../utils/helpers/callApi';
import { Typography } from '@mui/material';

function FixedBottomNavigation({ discussionId, newCommentSucceeded }) {
  const api = `https://get-hired-forum-dev.herokuapp.com/api/contributions/${discussionId}/`;

  const requestUrl = api;
  const [value, setValue] = React.useState(0);
  const [commentsToggle, setCommentsToggle] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);

  const [comments, setComments] = React.useState<any>([]);
  const [questions, setQuestions] = React.useState<any>([]);

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  React.useEffect(() => {
    callApi(requestUrl + 'comments').then((response) => {
      setComments(response);
    });
    callApi(requestUrl + 'questions').then((response) => {
      setQuestions(response);
    });
  }, [newCommentSucceeded]);

  return (
    <Box sx={{ width: 'inherit', m: 3 }} ref={ref}>
      <Paper sx={{ bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <BottomNavigationAction
            onClick={() => setCommentsToggle(true)}
            label={'Contributions (' + comments.length + ')'}
            icon={<ForumIcon />}
          />
          <BottomNavigationAction
            onClick={() => setCommentsToggle(false)}
            label={'Questions (' + questions.length + ')'}
            icon={<QuestionMarkIcon />}
          />
        </BottomNavigation>
      </Paper>
      <List>
        {/* <ListItem key={8}>
          <ListItemAvatar>
            <Avatar alt="Profile Picture" />
          </ListItemAvatar>
          <ListItemText primary={'Gethired user'} secondary={'dss'} />
        </ListItem> */}
        {commentsToggle ? (
          comments.length > 0 ? (
            comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" />
                </ListItemAvatar>
                <ListItemText
                  primary={'Gethired user ' + comment.userId}
                  secondary={comment.content}
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="h6" align="center" margin={3}>
              No comments yet :(
            </Typography>
          )
        ) : questions.length > 0 ? (
          questions.map((question) => (
            <ListItem key={question.id}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" />
              </ListItemAvatar>
              <ListItemText
                primary={'Gethired user ' + question.userId}
                secondary={question.content}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="h6" align="center" margin={3}>
            No questions yet :(
          </Typography>
        )}
      </List>
    </Box>
  );
}

export { FixedBottomNavigation };
