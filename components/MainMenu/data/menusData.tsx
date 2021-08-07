import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import { menuDataItem } from "../types";
import styled from "@emotion/styled";
export const NewDigWrap = styled.div`
  display: flex;
  background-color: #fff;
  padding-top: 23px;
  padding-bottom: 23px;
  position:relative;
  &:before {
    position: absolute;
    content: "";
    left: 99px;
    right: 99px;
    height: 1px;
    background-color: #000;
    top: 0;
  }
`;
export const Cate = styled.div`
  margin-right: 98px;
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-left: 99px;
  }
  &:last-child {
    margin-right: 108px;
  }
`;
export const CateItem = styled.div`
  font-family: Roboto Condensed;
  font-size: 14px;
  line-height: 16px;
  color: #000;
  text-transform: capitalize;
  margin-bottom: 5px;
  cursor: pointer;
`;
export const Divider = styled.div`
  width: 1px;
  height: 262px;
  background-color: #000;
`;
export const ImgWrapper = styled.div`
  margin-left: 116px;
  width: 296px;
`;
export const CateTitle = styled.div`
  font-family: "Roboto CondensedBold";
  font-size: 14px;
  line-height: 16px;
  color: #000;
  text-transform: uppercase;
  margin-bottom: 15px;
`;
export const ImageTitle = styled.div`
  font-size: 14px;
  line-height: 16px;
  font-family: "Roboto CondensedBold";
  color: #000;
  text-transform: uppercase;
`;
export const ImageInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;
export const MyImage = styled.img`
  width: 144px;
  height: auto;
`;
const NewDigs = () => {
  return (
    <NewDigWrap>
      <Cate>
        <CateTitle>CATEGORies</CateTitle>
        <CateItem>All Clothing</CateItem>
        <CateItem>Dresses</CateItem>
        <CateItem>Tops</CateItem>
        <CateItem>Pants</CateItem>
        <CateItem>Skirts</CateItem>
        <CateItem>Sweaters</CateItem>
        <CateItem>Denim</CateItem>
      </Cate>
      <Cate>
        <CateTitle>collections</CateTitle>
        <CateItem>Summer ‘21</CateItem>
        <CateItem>by POL</CateItem>
        <CateItem>Plus</CateItem>
        <CateItem>Denim</CateItem>
        <CateItem>POL TV</CateItem>
      </Cate>
      <Cate>
        <CateTitle>FEATURED</CateTitle>
        <CateItem>trend — 90s kids</CateItem>
        <CateItem>trend — dad’s closet</CateItem>
        <CateItem>chill summer</CateItem>
        <CateItem>throw it back</CateItem>
        <CateItem>back to school</CateItem>
      </Cate>
      <Cate>
        <CateTitle>BRANDS</CateTitle>
        <CateItem>POL</CateItem>
        <CateItem>Levi</CateItem>
        <CateItem>teva</CateItem>
        <CateItem>doc marten</CateItem>
      </Cate>
      <Divider />
      <ImgWrapper>
        <ImageTitle>On Sale</ImageTitle>
        <ImageInnerWrapper>
          <MyImage src={"/onsale2.png"} />
          <MyImage src={"/onsale1.png"} />
        </ImageInnerWrapper>
      </ImgWrapper>
    </NewDigWrap>
  );
};
export const menusData: menuDataItem[] = [
  {
    name: "HOT DIGS",
    key: "hotdigs",
    icon: () => <AccessAlarmIcon style={{ color: "#fff" }} />,
    pcIcon: () => <AccessAlarmIcon style={{ color: "#fff", marginRight: "5px" }} />
  },
  {
    name: "NEW DIGS",
    key: "newdigs",
    icon: () => <AssignmentIcon style={{ color: "#fff" }} />,
    pcMenuItem: <NewDigs />
  },
  {
    name: "CLOTHING",
    key: "clothing",
    children: [
      {
        name: "TOPS",
        key: "tops",
        icon: () => <LaptopMacIcon style={{ color: "#fff" }} />,
        pcIcon: () => <AccessAlarmIcon style={{ color: "#000", marginRight: "5px" }} />
      },
      {
        name: "BOTTOMS",
        key: "bottoms"
      },
      {
        name: "DRESSES",
        key: "dresses"
      },
      {
        name: "JACKETS",
        key: "jackets"
      },
      {
        name: "INTIMATES",
        key: "intimates"
      }
    ]
  },
  {
    name: "FRILLS",
    key: "frills",
    children: [
      {
        name: "BAGS",
        key: "bags"
      },
      {
        name: "SHADES",
        key: "shades"
      },
      {
        name: "HATS",
        key: "hats"
      },
      {
        name: "BELTS",
        key: "belts"
      },
      {
        name: "JEWELRY",
        key: "jewelry"
      }
    ]
  },
  {
    name: "PLUS",
    key: "plus"
  },
  {
    name: "BY POL",
    key: "bypol",
    children: [
      {
        name: "S/S 21",
        key: "ss21"
      },
      {
        name: "DENIM",
        key: "denim"
      },
      {
        name: "HOME",
        key: "home"
      }
    ]
  },
  {
    name: "SALE",
    key: "sale"
  },
  {
    name: "POL TV",
    key: "poltv"
  },
  {
    name: "EVENTS",
    key: "events"
  }
];
