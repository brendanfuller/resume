import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

import resume from "../config/resume.js";

/**
 * Resume Template inspired by https://alecgorge.com/Alec%20Gorge%20Resume.pdf
 */

interface ListItemProps {
  text: string;
  hasBullet: boolean;
}

/**
 * ListItem - An item in a list
 * @param param0
 * @returns
 */
const ListItem = ({ text, hasBullet = true }: ListItemProps) => {
  return (
    <Text
      style={[
        {
          fontSize: 9,
          marginTop: 2,
          marginLeft: hasBullet ? 3 : 0,
          lineHeight: 1.3,
          color: "#6a6a6a",
        },
        styles.roboto,
      ]}
    >
      {/* Do we need a bullet? */}
      {hasBullet && <>• </>}
      {/* Now show the text */}
      {text}
    </Text>
  );
};

interface CardProps {
  description: Array<string>;
  subject?: string;
  company: string;
  occupation?: string;
  time: string;
  colorless: boolean;
}

/**
 * Card - A card for each experience, project, or current job
 * @param description - Description of the job (Array of string)
 * @param subject - Basically a header of info, can be like programming languages
 * @param company - Company, project, or location.
 * @param time - When was this event occur?
 * @param colorless - Boolean to remove color from the header company title
 * @returns
 */
const Card = ({
  description,
  subject,
  company,
  occupation,
  time,
  colorless,
}: CardProps) => {
  return (
    <View style={cards.content}>
      <View style={cards.header}>
        {colorless ? (
          <>
            <Text style={[cards.title, { color: "gray" }]} wrap>
              {company}
            </Text>
          </>
        ) : (
          <>
            <Text wrap style={[cards.title, styles.primary]}>
              {company}
            </Text>
          </>
        )}
        <Text style={[cards.profession]}>
          {occupation && (
            <>
              <Text style={[{ fontWeight: "bold", color: "black" }]}>
                {occupation}
              </Text>
              {", "}
            </>
          )}
          <Text>{time}</Text>
        </Text>
      </View>
      <Text style={[cards.text, { marginBottom: 2 }, styles.primary]}>
        {subject}
      </Text>
      {/* Loop all of the list items from the descriptions */}
      <View style={cards.body}>
        {description.length == 1 ? (
          <>
            <ListItem text={description[0]} hasBullet={false} />
          </>
        ) : (
          <>
            {description.map((item, i) => {
              return <ListItem key={i} text={item} hasBullet={true} />;
            })}
          </>
        )}
      </View>
    </View>
  );
};

//Create style for the card based on flex and normal sizes
const cards = StyleSheet.create({
  primary: {
    color: resume.config.primaryColor,
  },
  body: {
    marginBottom: 20,
    flexDirection: "column",
    flexShrink: 1,
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 30,
    width: "100%",
  },
  content: {
    flexDirection: "column",
  },
  profession: {
    color: "gray",
    fontSize: 8,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  text: {
    color: "#6a6a6a",
    fontSize: 10,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  title: {
    color: "#6a6a6a",
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
});

const Simplex = () => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            <Text style={styles.primary}>{resume.name.first} </Text>
            {resume.name.last}
          </Text>
        </View>
        <View style={styles.contact}>
          <Text style={[styles.text, { marginBottom: 5 }]}>
            {resume.contact.phone}
          </Text>
          <Text style={styles.text}>
            <Link src={`mailto:${resume.contact.email}`}>
              {resume.contact.email}
            </Link>
          </Text>
        </View>
        <View style={styles.contact}>
          <Text style={[styles.text, { marginBottom: 5 }]}>
            <Link src={`https://${resume.contact.github}`}>
              {resume.contact.github}
            </Link>
          </Text>
          <Text style={styles.text}>
            <Text>{resume.contact.location}</Text>
            {" - "}
            <Link src={`https://${resume.contact.website}`}>
              {resume.contact.website}
            </Link>
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={[styles.stack, { marginTop: 20 }]}>
          {/* Show the main card for the information */}
          <Card {...resume.main} colorless={false} />
        </View>
        {/* Now loop all of the columns for each experiences/projects */}
        <View style={styles.columns} wrap>
          <View style={[styles.stack, { marginRight: 32 }]} wrap>
            <Text style={[styles.roboto, { fontSize: 10, color: "gray" }]}>
              EXPERIENCES
            </Text>
            {resume.experience.map((item, index) => {
              return <Card key={index} {...item} colorless={false} />;
            })}
          </View>
          <View style={styles.stack} wrap>
            <Text style={[styles.roboto, { fontSize: 10, color: "gray" }]}>
              PROJECTS
            </Text>
            {resume.projects.map((item, index) => {
              return <Card key={index} {...item} colorless={false} />;
            })}
            <Text style={[styles.roboto, { fontSize: 10, color: "gray" }]}>
              EDUCATION
            </Text>
            {resume.education.map((item, index) => {
              return <Card key={index} {...item} colorless={true} />;
            })}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf",
});

const styles = StyleSheet.create({
  primary: {
    color: resume.config.primaryColor,
  },
  body: {
    padding: 32,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 50,
    width: "100%",
  },
  content: {
    flexDirection: "column",
  },
  contact: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Roboto",
  },
  text: {
    color: "gray",
    fontSize: 8,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  title: {
    color: "#6a6a6a",
    fontSize: 42,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  stack: {
    flexDirection: "column",
    width: "100%",
  },
  columns: {
    flexDirection: "row",
  },
  roboto: {
    textAlign: "justify",
    fontFamily: "Roboto",
  },
});

export default Simplex;
