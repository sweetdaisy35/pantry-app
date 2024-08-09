'use client'
import { useState, useEffect } from "react";
import { firestore } from '@/firebase';
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, query, getDocs, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import Link from 'next/link';  // Import Link component

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Filtered inventory based on search query
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography>Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            > Add </Button>
          </Stack>
        </Box>
      </Modal>

      <Button
        variant="contained"
        sx={{
          backgroundColor: '#ff009d', // Custom background color
          color: '#fff',               // Custom text color
          '&:hover': {
            backgroundColor: '#e60088', // Custom hover color
          },
        }}
        onClick={() => handleOpen()}
      >
        Add New Item
      </Button>

      <TextField
        variant="outlined"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2, width: '50%' }}
      />

      <Box border="1px solid #000000" width="800px">
        <Box
          width="100%"
          height="100px"
          bgcolor="#ff009d"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" color="#000000">
            Inventory Items
          </Typography>
        </Box>

        <Stack width="100%" height="300px" spacing={2} overflow="auto">
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="grid"
              gridTemplateColumns="0.5fr 100px 150px"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#f0f0f0"
              padding={5}
            >
              <Typography variant="h3" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#333" textAlign="center">
                {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#ff009d', // Custom background color
                    color: '#fff',               // Custom text color
                    '&:hover': {
                      backgroundColor: '#00897b', // Custom hover color
                    },
                  }}
                  onClick={() => addItem(name)}
                >
                  Add
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#ff009d', // Custom background color
                    color: '#fff',               // Custom text color
                    '&:hover': {
                      backgroundColor: '#ff3131', // Custom hover color
                    },
                  }}
                  onClick={() => removeItem(name)}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box position="absolute" bottom={0} width="100%" textAlign="center" padding={2} >
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} PantryPro. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}
