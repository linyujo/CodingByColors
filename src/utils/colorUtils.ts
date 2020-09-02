import { shuffle } from "./arrayUtils"

const grayColorsMap = {
  lightslategrey: "#778899",
  slategrey: "#708090",
  dimgrey: "#696969",
  bone: "#e3dac9",
  lightgrey: "#d3d3d3",
  lavenderGray: "#c4c3d0",
  pastelGray: "#cfcfc4",
  paleSilver: "#c9c0bb",
  silverSand: "#bfc1c2",
  silver: "#c0c0c0",
  ashGrey: "#b2beb5",
  silverPink: "#c4aead",
  darkgrey: "#a9a9a9",
  cadetGrey: "#91a3b0",
  manatee: "#979aaa",
  grayBlue: "#8c92ac",
  grullo: "#a99a86",
  romanSilver: "#838996",
  cinereous: "#98817b",
  mountbattenPink: "#997a8d",
  rhythm: "#777696",
  taupeGray: "#8b8589",
  rocketMetallic: "#8a7f80",
  darkBlueGray: "#666699",
  rustyCeladon: "#898a74",
  smoke: "#738276",
  auroMetalSaurus: "#6e7f80",
  shadow: "#8a795d",
  deepTaupe: "#7e5e60",
  payneGrey: "#536878",
  cadet: "#536872",
  wenge: "#645452",
  deepSpaceSparkle: "#4a646c",
  independence: "#4c516d",
  stormcloud: "#4f666a",
  oldBambooColor: "#5e644f",
  ebony: "#555d50",
  darkLiver: "#534b4f",
  quartz: "#51484f",
  outerSpace: "#414a4c",
  darkPuce: "#4f3a3c",
  charcoal: "#36454f",
  arsenic: "#3b444b",
  darkslategrey: "#2f4f4f",
  taupe: "#483c32",
  storeroomBrown: "#3d4035",
  onyx: "#353839",
  kombuGreen: "#354230",
  jet: "#343434",
  blackLeatherJacket: "#253529",
  charlestonGreen: "#232b2b",
}

const grayColorValues: string[] = Object.values(grayColorsMap)
const shuffedGrayColorValues: string[] = shuffle(grayColorValues)

const randomColor = function (): string {
  let colorCodes = [...shuffedGrayColorValues]
  const color = function (): string {
    // choosing items randomly until all are taken and then repeating
    if (colorCodes.length < 1) {
      colorCodes = [...shuffedGrayColorValues]
    }
    const index = Math.floor(Math.random() * colorCodes.length)
    const code = colorCodes[index]
    colorCodes.splice(index, 1)
    return code
  }
  return color()
}

export { randomColor }
