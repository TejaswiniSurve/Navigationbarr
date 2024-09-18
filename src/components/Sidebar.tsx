// src/components/Sidebar.tsx

import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import PaperIcon from '@mui/icons-material/Note'; // Use the paper icon here
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { TextField } from '@mui/material';

// Define Ticket type
interface Ticket {
  id: number;
  requester: string;
  email: string;
  subject: string;
  agent: string;
  status: string;
  lastMessage: string;
}

// Define props type for Sidebar
interface SidebarProps {
  window?: () => Window;
}

const drawerWidth = 240;

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 'bold',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CustomTableCellStyle = styled(TableCell)(({ theme }) => ({
  padding: '8px 16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CheckboxCell = styled(TableCell)(({ theme }) => ({
  padding: '8px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Logo = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginRight: 8,
}));

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState('All Recent Tickets');
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [selectedTickets, setSelectedTickets] = React.useState<Set<Ticket>>(new Set());
  const [selectAll, setSelectAll] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const navigate = useNavigate(); // Initialize navigate

  // Fetch tickets from JSON server
  React.useEffect(() => {
    axios.get('http://localhost:5001/tickets')
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tickets!", error);
      });
  }, []);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenuClick = (text: string) => {
    setSelectedMenu(text);
  };

  const handleCheckboxChange = (ticket: Ticket) => {
    setSelectedTickets(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(ticket)) {
        newSelected.delete(ticket);
      } else {
        newSelected.add(ticket);
      }
      return newSelected;
    });
  };

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setSelectedTickets(isChecked ? new Set(tickets) : new Set());
  };

  const handleRequesterClick = (requester: string) => {
    navigate(`/requester/${encodeURIComponent(requester)}`);
  };

  const filteredTickets = () => {
    let statusToFilter = selectedMenu !== 'All Recent Tickets' ? selectedMenu.toLowerCase() : null;

    if (selectedMenu === 'Tickets To Handle') {
      statusToFilter = 'open'; // Show only open tickets
    }

    return tickets.filter(ticket => {
      const ticketStatusLower = ticket.status.toLowerCase();
      const matchesStatus = !statusToFilter || ticketStatusLower === statusToFilter;
      const matchesSearch = searchQuery ? (
        ticket.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      ) : true;
  
      return matchesStatus && matchesSearch;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const getLogo = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const drawer = (
    <div>
      <Box sx={{ padding: 2, marginBottom: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 1 }}>
          <Typography variant="h6">Tickets</Typography>
          <Button variant="contained" color="primary" sx={{ backgroundColor: 'blue' }} onClick={() => handleMenuClick('All Recent Tickets')}>
            New Ticket
          </Button>
        </Box>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <Divider />
      <List>
        {['All Recent Tickets', 'Tickets To Handle', 'My Open Tickets', 'My Tickets Last 7 Days'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Open', 'Pending', 'On Hold', 'Solved', 'Closed'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: 2
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Set up email forwarding to get tickets
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>
            Setup Instructions
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          onTransitionEnd={handleDrawerTransitionEnd}
        >
          {drawer}
        </Drawer>
        <Drawer
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          open
        >
          <Box sx={{ padding: 2 }}>
            <PaperIcon />
            <Typography variant="h6" component="div">
              Tickets
            </Typography>
          </Box>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <CheckboxCell padding="checkbox">
                  <Checkbox
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </CheckboxCell>
                <CustomTableCell>Requester</CustomTableCell>
                <CustomTableCell>Subject</CustomTableCell>
                <CustomTableCell>Agent</CustomTableCell>
                <CustomTableCell>Status</CustomTableCell>
                <CustomTableCell>Last Message</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets().map((ticket) => (
                <TableRow key={ticket.id}>
                  <CheckboxCell>
                    <Checkbox
                      checked={selectedTickets.has(ticket)}
                      onChange={() => handleCheckboxChange(ticket)}
                    />
                  </CheckboxCell>
                  <CustomTableCellStyle onClick={() => handleRequesterClick(ticket.requester)}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Logo>{getLogo(ticket.requester)}</Logo>
                      <div>
                        <Typography variant="body2">{ticket.requester}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {ticket.email}
                        </Typography>
                      </div>
                    </Box>
                  </CustomTableCellStyle>
                  <CustomTableCellStyle>{ticket.subject}</CustomTableCellStyle>
                  <CustomTableCellStyle>{ticket.agent}</CustomTableCellStyle>
                  <CustomTableCellStyle>{ticket.status}</CustomTableCellStyle>
                  <CustomTableCellStyle>{ticket.lastMessage}</CustomTableCellStyle>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  window: PropTypes.func,
};
