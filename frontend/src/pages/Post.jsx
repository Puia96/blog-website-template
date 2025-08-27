import React from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PostData from "../components/PostData";
import Tag from "../components/Tag";

const Post = () => {
  return (
    <div className="mt-16 sm:mt-20 px-3 sm:px-72">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab _selected={{ color: "white", bg: "blue.500" }}>Post</Tab>
          <Tab _selected={{ color: "white", bg: "blue.500" }}>Tags</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PostData />
          </TabPanel>
          <TabPanel>
            <Tag />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Post;
