import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import "./style.css";

const skeletonData = [];

for (let i = 0; i < 20; i++) {
  skeletonData.push({});
}
export default function Contacts() {
  const [contactsLoading, setContactsLoading] = useState(true);
  //   const [newPageLoading, setNewPageLoading] = useState(true);

  const [contacts, setContacts] = useState(skeletonData);
  const [pageNumber, setPageNumber] = useState(1);
  const [fetchError, setFetchError] = useState(false);
  const observerRef = useRef(null);
  const scrollRef = useRef(null);
  const lastContactRef = useCallback(
    (node) => {
      console.log(node);
      if (contactsLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          //   setNewPageLoading(true);

          const pageSetter = () => {
            setPageNumber((prev) => prev + 1);
          };

          setTimeout(pageSetter, 3000);
          //   setNewPageLoading(false);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [contactsLoading]
  );
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [pageNumber]);

  const contactFetch = async () => {
    try {
      setContactsLoading(true);

      const { data } = await axios.get(
        `https://randomuser.me/api/?page=${pageNumber}&results=18&seed=abc `
      );
      setContacts(data.results);
      setContactsLoading(false);
    } catch (error) {
      setFetchError(true);
    }
  };
  useEffect(() => {
    contactFetch();
  }, [pageNumber]);
  return (
    <div className="contacts">
      <div ref={scrollRef} className="contacts_wrap scrollbar">
        {contacts.map((contact, i) => {
          if (contacts.length === i + 1) {
            return (
              <>
                <div key={i} ref={lastContactRef} className="contact_card">
                  <div className="img_box">
                    {contactsLoading ? (
                      <Box sx={{ width: "100%" }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                      </Box>
                    ) : (
                      <img src={contact?.picture?.medium} alt="" />
                    )}
                  </div>
                  <div className="name_wrap" key={i}>
                    {contactsLoading ? (
                      <Box sx={{ width: "100%" }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                      </Box>
                    ) : (
                      `${contact?.name?.first}`
                    )}
                  </div>
                  <div></div>
                </div>
                <div className="loading">
                  <ThreeDots
                    height="50"
                    width="50"
                    radius="9"
                    color="#000000"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              </>
            );
          } else {
            return (
              <div key={i} className="contact_card">
                <div className="img_box">
                  {contactsLoading ? (
                    <Box sx={{ width: 70 }}>
                      <Skeleton />
                      <Skeleton animation="wave" />
                      <Skeleton animation={false} />
                    </Box>
                  ) : (
                    <img src={contact?.picture?.medium} alt="" />
                  )}
                </div>
                <div className="name_wrap" key={i}>
                  {contactsLoading ? (
                    <Box sx={{ width: 200 }}>
                      {/* <Skeleton /> */}
                      <Skeleton animation="wave" />
                      {/* <Skeleton animation={false} /> */}
                    </Box>
                  ) : (
                    `${contact?.name?.first}`
                  )}
                </div>
                <div></div>
              </div>
            );
          }
        })}
        {/* {contactsLoading &&
          contacts.map((item) => {
            return (
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            );
          })} */}
      </div>
    </div>
  );
}
