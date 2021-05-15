
import { generatorDialog } from "./generatorDialog.js";

export class treasureGenerator {

    static async startGenerator() {
        await generatorDialog.renderDialog();
    }
}

// Render the sbcButton when the actorDirectory is visible
Hooks.on("renderItemDirectory", (app, html, data) => {
    //sbcConfig.options.debug && sbcUtils.log("Rendering sbc button")
    const startGenButton = $("<button id='startGenButton' class='create-entity genButton'><i class='fas fa-coins'></i> Generate Treasure</button>");
    html.find(".directory-footer").append(startGenButton);
     startGenButton.click(async (ev) => {
         runGenerator();
     });

});

let typeATreasure = [
    {value: 1, rewardText: "Avg 1 gp", rewards: ["5d10 cp", "3d4 sp"]},
    {value: 5, rewardText: "Avg 3.8 gp", rewards: ["2d6 * 10 cp", "4d8 sp", "1d4 gp"]},
    {value: 10, rewardText: "Avg 9.1 gp", rewards: ["5d10 * 10 cp", "5d10 sp", "1d8 gp"]},
    {value: 25, rewardText: "Avg 25.5 gp", rewards: ["2d4 * 100 cp", "3d6 * 10 sp", "4d4 gp"]},
    {value: 50, rewardText: "Avg 52 gp", rewards: ["4d4 * 100 cp", "4d6 * 10 sp", "8d6 gp"]},
    {value: 100, rewardText: "Avg 102 gp", rewards: ["6d8 * 10 sp", "3d4 * 10 gp"]},
    {value: 200, rewardText: "Avg 200 gp", rewards: ["2d4 * 100 sp", "4d4 * 10 gp", "2d4 pp"]},
    {value: 500, rewardText: "Avg 490 gp", rewards: ["6d6 * 10 gp", "8d6 pp"]},
    {value: 1000, rewardText: "Avg 1050 gp", rewards: ["2d4 * 100 gp", "10d10 pp"]},
    {value: 5000, rewardText: "Avg 5100 gp", rewards: ["4d8 * 100 gp", "6d10 * 10 pp"]},
    {value: 10000, rewardText: "Avg 10400 gp", rewards: ["2d4 * 1000 gp", "12d8 * 10 pp"]},
    {value: 50000, rewardText: "Avg 51000 gp", rewards: ["2d6 * 1000 gp", "8d10 * 100 pp"]}
];
let typeBTreasure = [
    {value: 10, rewardText: "Gr. 1 Gemstone", rewards: ["Grade 1 Gemstones"]},
    {value: 15, rewardText: "Avg 4 gp, Gr. 1 Gemstone", rewards: ["2d6 * 10 cp", "4d8 sp", "1d4 gp", "Grade 1 Gemstones"]},
    {value: 25, rewardText: "4.8 gp, 2x Gr. 1 Gemstones", rewards: ["5d10 sp", "1d4 gp", "Grade 1 Gemstones", "Grade 1 Gemstones"]},
    {value: 50, rewardText: "Gr. 2 Gemstone", rewards: ["Grade 2 Gemstones"]},
    {value: 50, rewardText: "Avg 21 gp, 3x Gr. 1 Gemstones", rewards: ["3d6 * 10 sp", "3d6 gp", "Grade 1 Gemstones", "Grade 1 Gemstones", "Grade 1 Gemstones"]},
    {value: 75, rewardText: "Avg 5 gp, 2x Gr. 1 Gemstones, Gr. 2 Gemstone", rewards: ["1d4 * 10 sp", "1d4 gp", "Grade 1 Gemstones", "Grade 1 Gemstones", "Grade 2 Gemstones"]},
    {value: 100, rewardText: "Gr. 3 Gemstone", rewards: ["Grade 3 Gemstones"]},
    {value: 100, rewardText: "Avg 31.5 gp, 2x Gr. 1 Gemstones, Gr. 2 Gemstone", rewards: ["3d8 * 10 sp", "4d8 gp", "Grade 1 Gemstones", "Grade 1 Gemstones", "Grade 2 Gemstones"]},
    {value: 150, rewardText: "Gr. 2 Gemstone, Gr. 3 Gemstone", rewards: ["Grade 2 Gemstones", "Grade 3 Gemstones"]},
    {value: 200, rewardText: "Avg 60.5 gp, 4x Gr. 1 Gemstones, Gr. 3 Gemstone", rewards: ["3d6 * 10 sp", "2d4 * 10 gp", "Grade 1 Gemstones", "Grade 1 Gemstones", "Grade 1 Gemstones", "Grade 1 Gemstones", "Grade 3 Gemstones"]},
    {value: 250, rewardText: "Avg 50 gp, 2x Gr. 2 Gemstones, Gr. 3 Gemstone", rewards: ["2d4 * 10 gp", "Grade 2 Gemstones", "Grade 2 Gemstones", "Grade 3 Gemstones"]},
    {value: 500, rewardText: "Gr. 4 Gemstone", rewards: ["Grade 4 Gemstones"]},
    {value: 500, rewardText: "Avg 100 gp, 2x Gr. 2 Gemstones, 3x Gr. 3 Gemstones", rewards: ["2d4 * 10 gp", "2d4 pp", "Grade 2 Gemstones", "Grade 2 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones"]},
    {value: 750, rewardText: "Avg 50 gp, 2x Gr. 2 Gemstones, Gr. 4 Gemstone", rewards: ["2d4 * 10 gp", "Grade 2 Gemstones", "Grade 2 Gemstones", "Grade 4 Gemstones"]},
    {value: 1000, rewardText: "Gr. 5 Gemstone", rewards: ["Grade 5 Gemstones"]},
    {value: 1000, rewardText: "Avg 205 gp, 3x Gr. 3 Gemstones, Gr. 4 Gemstone", rewards: ["3d6 * 10 gp", "4d4 pp", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 4 Gemstones"]},
    {value: 2500, rewardText: "Avg 500 gp, 2x Gr. 4 Gemstones, Gr. 5 Gemstone", rewards: ["2d4 * 100 gp", "Grade 4 Gemstones", "Grade 4 Gemstones", "Grade 5 Gemstones"]},
    {value: 5000, rewardText: "Gr. 6 Gemstone", rewards: ["Grade 6 Gemstones"]},
    {value: 5000, rewardText: "Avg 1000 gp, 2x Gr. 4 Gemstones, 3x Gr. 5 Gemstones", rewards: ["2d4 * 100 gp", "2d4 * 10 pp", "Grade 4 Gemstones", "Grade 4 Gemstones", "Grade 5 Gemstones", "Grade 5 Gemstones", "Grade 5 Gemstones"]},
    {value: 10000, rewardText: "5x Gr. 5 Gemstones, Gr. 6 Gemstone", rewards: ["Grade 5 Gemstones", "Grade 5 Gemstones", "Grade 5 Gemstones", "Grade 5 Gemstones", "Grade 5 Gemstones", "Grade 6 Gemstones"]},
    {value: 20000, rewardText: "Avg 5100 gp, 3x Gr. 6 Gemstones", rewards: ["4d8 * 100 gp", "6d10 * 10 pp", "Grade 6 Gemstones", "Grade 6 Gemstones", "Grade 6 Gemstones"]},
    {value: 50000, rewardText: "Avg 1000 gp, 10x Gr. 3 Gemstones, 8x Gr. 6 Gemstones", rewards: ["4d4 * 10 pp", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 6 Gemstones", "Grade 6 Gemstones", "Grade 6 Gemstones", "Grade 6 Gemstones", "Grade 6 Gemstones", "Grade 6 Gemstones", "Grade 6 Gemstones", "Grade 6 Gemstones"]}
];
let typeCTreasure = [
    {value: 50, rewardText: "Gr. 1 Art Object", rewards: ["Grade 1 Art Objects"]},
    {value: 100, rewardText: "Gr. 2 Art Object", rewards: ["Grade 2 Art Objects"]},
    {value: 100, rewardText: "2x Gr. 1 Art Objects", rewards: ["Grade 1 Art Objects", "Grade 1 Art Objects"]},
    {value: 150, rewardText: "Gr. 1 Art Object, Gr. 2 Art Object", rewards: ["Grade 1 Art Objects", "Grade 2 Art Objects"]},
    {value: 200, rewardText: "2x Gr. 2 Art Objects", rewards: ["Grade 2 Art Objects", "Grade 2 Art Objects"]},
    {value: 250, rewardText: "3x Gr. 1 Art Objects, Gr. 2 Art Object", rewards: ["Grade 1 Art Objects", "Grade 1 Art Objects", "Grade 1 Art Objects", "Grade 2 Art Objects"]},
    {value: 500, rewardText: "Gr. 3 Art Object", rewards: ["Grade 3 Art Objects"]},
    {value: 500, rewardText: "4x Gr. 1 Art Objects, 3x Gr. 2 Art Objects", rewards: ["Grade 1 Art Objects", "Grade 1 Art Objects", "Grade 1 Art Objects", "Grade 1 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects"]},
    {value: 750, rewardText: "3x Gr. 1 Art Objects, 2x Gr. 2 Art Objects, Gr. 3 Art Object", rewards: ["Grade 1 Art Objects", "Grade 1 Art Objects", "Grade 1 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 3 Art Objects"]},
    {value: 1000, rewardText: "Gr. 4 Art Object", rewards: ["Grade 4 Art Objects"]},
    {value: 1000, rewardText: "2x Gr. 3 Art Objects", rewards: ["Grade 3 Art Objects", "Grade 3 Art Objects"]},
    {value: 1500, rewardText: "Gr. 3 Art Object, Gr. 4 Art Object", rewards: ["Grade 3 Art Objects", "Grade 4 Art Objects"]},
    {value: 2000, rewardText: "2x Gr. 4 Art Objects", rewards: ["Grade 4 Art Objects", "Grade 4 Art Objects"]},
    {value: 2500, rewardText: "5x Gr. 2 Art Objects, 2x Gr. 3 Art Objects, Gr. 4 Art Object", rewards: ["Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 4 Art Objects"]},
    {value: 5000, rewardText: "Gr. 5 Art Object", rewards: ["Grade 5 Art Objects"]},
    {value: 5000, rewardText: "4x Gr. 3 Art Objects, 3x Gr. 4 Art Objects", rewards: ["Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects"]},
    {value: 7500, rewardText: "Gr. 3 Art Object, 2x Gr. 4 Art Objects, Gr. 5 Art Object", rewards: ["Grade 3 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 5 Art Objects"]},
    {value: 10000, rewardText: "Gr. 6 Art Object", rewards: ["Grade 6 Art Objects"]},
    {value: 10000, rewardText: "5x Gr. 4 Art Objects, Gr. 5 Art Object", rewards: ["Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 5 Art Objects"]},
    {value: 15000, rewardText: "Gr. 5 Art Object, Gr. 6 Art Object", rewards: ["Grade 5 Art Objects", "Grade 6 Art Objects"]},
    {value: 20000, rewardText: "2x Gr. 5 Art Objects, Gr. 6 Art Object", rewards: ["Grade 5 Art Objects", "Grade 5 Art Objects", "Grade 6 Art Objects"]},
    {value: 50000, rewardText: "10x Gr. 3 Art Objects, 5x Gr. 4 Art Objects, 4x Gr. 5 Art Objects, 2x Gr. 6 Art Objects", rewards: ["Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 5 Art Objects", "Grade 5 Art Objects", "Grade 5 Art Objects", "Grade 5 Art Objects", "Grade 6 Art Objects", "Grade 6 Art Objects"]}
];
let typeDTreasure = [
    {value: 50, rewardText: "Avg 20.5 gp, L.Min. Scroll", rewards: ["3d6 * 10 sp", "4d4 gp", "Lesser Minor Scrolls"]},
    {value: 50, rewardText: "Avg 10 gp, L.Min. Potion", rewards: ["2d4 * 10 sp", "2d4 gp", "Lesser Minor Potions"]},
    {value: 100, rewardText: "Avg 30.5 gp, L.Min. Potion, L.Min. Scroll", rewards: ["4d6 * 10 sp", "3d10 gp", "Lesser Minor Potions", "Lesser Minor Scrolls"]},
    {value: 150, rewardText: "Avg 26 gp, G.Min. Scroll", rewards: ["2d4 * 10 sp", "6d6 gp", "Greater Minor Scrolls"]},
    {value: 200, rewardText: "Avg 19 gp, G.Min. Potion, L.Min. Scroll", rewards: ["2d4 * 10 sp", "4d6 gp", "Greater Minor Potions", "Lesser Minor Scrolls"]},
    {value: 250, rewardText: "Avg 46 gp, 2x L.Min. Potions, G.Min. Scroll", rewards: ["3d6 * 10 sp", "3d6 gp", "1d4 pp", "Lesser Minor Potions", "Lesser Minor Potions", "Greater Minor Scrolls"]},
    {value: 300, rewardText: "Avg 26 gp, G.Min. Potion, G.Min. Scroll", rewards: ["2d4 * 10 sp", "6d6 gp", "Greater Minor Potions", "Greater Minor Scrolls"]},
    {value: 400, rewardText: "G.Min. Potion, 2x G.Min. Scrolls", rewards: ["Greater Minor Potions", "Greater Minor Scrolls", "Greater Minor Scrolls"]},
    {value: 500, rewardText: "Avg 75 gp, L.Med. Potion, G.Min. Scroll", rewards: ["2d4 * 10 gp", "1d4 pp", "Lesser Medium Potions", "Greater Minor Scrolls"]},
    {value: 500, rewardText: "Avg 75 gp, 2x G.Min. Potions, G.Min. Scroll", rewards: ["2d4 * 10 gp", "1d4 pp", "Greater Minor Potions", "Greater Minor Potions", "Greater Minor Scrolls"]},
    {value: 750, rewardText: "Avg 24.5 gp, G.Min. Scroll, L.Min. Wand", rewards: ["7d6 gp", "Greater Minor Scrolls", "Lesser Minor Wands"]},
    {value: 1000, rewardText: "Avg 205 gp, L.Med. Potion, L.Med. Scroll", rewards: ["4d4 * 10 gp", "3d6 pp", "Lesser Medium Potions", "Lesser Medium Scrolls"]},
    {value: 1000, rewardText: "Avg 100 gp, L.Med. Potion, L.Min. Wand", rewards: ["2d4 * 10 gp", "2d4 pp", "Lesser Medium Potions", "Lesser Minor Wands"]},
    {value: 1500, rewardText: "G.Min. Wand", rewards: ["Greater Minor Wands"]},
    {value: 1500, rewardText: "Avg 205 gp, G.Med. Potion, G.Med. Scroll", rewards: ["4d4 * 10 gp", "3d6 pp", "Greater Medium Potions", "Greater Medium Scrolls"]},
    {value: 2000, rewardText: "G.Med. Potion, G.Min. Wand", rewards: ["Greater Medium Potions", "Greater Minor Wands"]},
    {value: 2000, rewardText: "Avg 100 gp, L.Med. Potion, 2x G.Med. Scrolls", rewards: ["2d4 * 10 gp", "2d4 pp", "Lesser Medium Potions", "Greater Medium Scrolls", "Greater Medium Scrolls"]},
    {value: 3000, rewardText: "Avg 205 gp, G.Med. Potion, G.Med. Scroll, G.Min. Wand", rewards: ["3d6 * 10 gp", "4d4 pp", "Greater Medium Potions", "Greater Medium Scrolls", "Greater Minor Wands"]},
    {value: 4000, rewardText: "Avg 205 gp, G.Med. Scroll, 2x G.Min. Wands", rewards: ["3d6 * 10 gp", "4d4 pp", "Greater Medium Scrolls", "Greater Minor Wands", "Greater Minor Wands"]},
    {value: 5000, rewardText: "Avg 100 gp, 3x L.Maj. Potions, 2x G.Med. Scrolls, G.Min. Wand", rewards: ["2d4 * 10 gp", "2d4 pp", "Lesser Major Potions", "Lesser Major Potions", "Lesser Major Potions", "Greater Medium Scrolls", "Greater Medium Scrolls", "Greater Minor Wands"]},
    {value: 7500, rewardText: "Avg 70 gp, L.Maj. Scroll, L.Med. Wand", rewards: ["2d6 pp", "Lesser Major Scrolls", "Lesser Medium Wands"]},
    {value: 7500, rewardText: "Avg 175 gp, 2x G.Maj. Potions, 2x G.Maj. Scrolls", rewards: ["5d6 pp", "Greater Major Potions", "Greater Major Potions", "Greater Major Scrolls", "Greater Major Scrolls"]},
    {value: 10000, rewardText: "G.Med. Wand", rewards: ["Greater Medium Wands"]},
    {value: 10000, rewardText: "Avg 140 gp, G.Maj. Potion, G.Maj. Scroll, L.Med. Wand", rewards: ["4d6 pp", "Greater Major Potions", "Greater Major Scrolls", "Lesser Medium Wands"]},
    {value: 15000, rewardText: "L.Maj. Wand", rewards: ["Lesser Major Wands"]},
    {value: 15000, rewardText: "Avg 495 gp, 3x G.Maj. Potions, 2x L.Maj. Scrolls, G.Med. Wand", rewards: ["9d10 pp", "Greater Major Potions", "Greater Major Potions", "Greater Major Potions", "Lesser Major Scrolls", "Lesser Major Scrolls", "Greater Medium Wands"]},
    {value: 20000, rewardText: "Avg 600 gp, 2x G.Maj. Potions, G.Maj. Scroll, L.Maj. Wand", rewards: ["4d4 * 10 gp", "2d4 * 10 pp", "Greater Major Potions", "Greater Major Potions", "Greater Major Scrolls", "Lesser Major Wands"]},
    {value: 20000, rewardText: "Avg 210 gp, 3x L.Maj. Potions, G.Maj. Wand", rewards: ["6d6 * 10 gp", "Lesser Major Potions", "Lesser Major Potions", "Lesser Major Potions", "Greater Major Wands"]},
    {value: 25000, rewardText: "5x G.Maj. Scrolls, G.Med. Wand", rewards: ["Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Medium Wands"]},
    {value: 30000, rewardText: "Avg 210 gp, 4x G.Maj. Potions, 3x G.Maj. Scrolls, G.Maj. Wand", rewards: ["6d6 pp", "Greater Major Potions", "Greater Major Potions", "Greater Major Potions", "Greater Major Potions", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Wands"]},
    {value: 50000, rewardText: "Avg 2000 gp, 4x G.Maj. Scrolls, 2x G.Maj. Wands", rewards: ["8d4 * 10 pp", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Wands", "Greater Major Wands"]}
];
let typeETreasure = [
    {value: 200, rewardText: "Masterwork Light Armor or Shield", rewards: ["Masterwork Light Armour or Shield"]},
    {value: 300, rewardText: "Masterwork Medium Armor", rewards: ["Masterwork Medium Armours"]},
    {value: 350, rewardText: "Masterwork Weapon", rewards: ["Masterwork Weapon Type"]},
    {value: 1000, rewardText: "Masterwork Heavy Armor", rewards: ["Masterwork Heavy Armours"]},
    {value: 1500, rewardText: "L.Min. Armor", rewards: ["Lesser Minor Armour and Shields"]},
    {value: 2500, rewardText: "L.Min. Weapon", rewards: ["Lesser Minor Weapon"]},
    {value: 3000, rewardText: "G.Min. Armor", rewards: ["Greater Minor Armour and Shields"]},
    {value: 3000, rewardText: "Masterwork Medium Armor, Masterwork Shield, L.Min. Weapon", rewards: ["Masterwork Medium Armours", "Masterwork Shields", "Lesser Minor Weapon"]},
    {value: 4000, rewardText: "L.Min. Armor, L.Min. Weapon", rewards: ["Lesser Minor Armour and Shields", "Lesser Minor Weapon"]},
    {value: 5500, rewardText: "G.Min. Armor, L.Min. Weapon", rewards: ["Greater Minor Armour and Shields", "Lesser Minor Weapon"]},
    {value: 6000, rewardText: "G.Min. Weapon", rewards: ["Greater Minor Weapon"]},
    {value: 7500, rewardText: "L.Min. Armor, G.Min. Weapon", rewards: ["Lesser Minor Armour and Shields", "Greater Minor Weapon"]},
    {value: 8000, rewardText: "G.Min. Armor, 2x L.Min. Weapons", rewards: ["Greater Minor Armour and Shields", "Lesser Minor Weapon", "Lesser Minor Weapon"]},
    {value: 9000, rewardText: "G.Min. Armor, G.Min. Weapon", rewards: ["Greater Minor Armour and Shields", "Greater Minor Weapon"]},
    {value: 10000, rewardText: "L.Med. Armor, L.Min. Weapon", rewards: ["Lesser Medium Armour and Shields", "Lesser Minor Weapon"]},
    {value: 13000, rewardText: "L.Med. Weapon", rewards: ["Lesser Medium Weapon"]},
    {value: 13000, rewardText: "L.Med. Armor, G.Min. Weapon", rewards: ["Lesser Medium Armour and Shields", "Greater Minor Weapon"]},
    {value: 15000, rewardText: "G.Med. Armor, L.Min. Weapon", rewards: ["Greater Medium Armour and Shields", "Lesser Minor Weapon"]},
    {value: 20000, rewardText: "L.Med. Armor, L.Med. Weapon", rewards: ["Lesser Medium Armour and Shields", "Lesser Medium Weapon"]},
    {value: 25000, rewardText: "G.Min. Armor, G.Med. Weapon", rewards: ["Greater Minor Armour and Shields", "Greater Medium Weapon"]},
    {value: 30000, rewardText: "L.Maj. Armor, L.Min. Weapon, G.Min. Weapon", rewards: ["Lesser Major Armour and Shields", "Lesser Minor Weapon", "Greater Minor Weapon"]},
    {value: 30000, rewardText: "L.Med. Armor, G.Med. Weapon", rewards: ["Lesser Medium Armour and Shields", "Greater Medium Weapon"]},
    {value: 35000, rewardText: "L.Maj. Armor, L.Med. Weapon", rewards: ["Lesser Major Armour and Shields", "Lesser Medium Weapon"]},
    {value: 35000, rewardText: "L.Min. Armor, L.Maj. Weapon", rewards: ["Lesser Minor Armour and Shields", "Lesser Major Weapon"]},
    {value: 40000, rewardText: "G.Maj. Armor, G.Min. Weapon", rewards: ["Greater Major Armour and Shields", "Greater Minor Weapon"]},
    {value: 50000, rewardText: "G.Maj. Armor, L.Med. Weapon", rewards: ["Greater Major Armour and Shields", "Lesser Medium Weapon"]},
    {value: 75000, rewardText: "G.Min. Armor, G.Maj. Weapon", rewards: ["Greater Minor Armour and Shields", "Greater Major Weapon"]},
    {value: 100000, rewardText: "G.Maj. Armor, G.Maj. Weapon", rewards: ["Greater Major Armour and Shields", "Greater Major Weapon"]}
];
let typeFTreasure = [
    {value: 50, rewardText: "L.Min. Potion", rewards: ["Lesser Minor Potions"]},
    {value: 250, rewardText: "Masterwork Light Armor or Shield, L.Min. Potion", rewards: ["Masterwork Light Armour or Shield", "Lesser Minor Potions"]},
    {value: 350, rewardText: "Masterwork Medium Armor, L.Min. Potion", rewards: ["Masterwork Medium Armours", "Lesser Minor Potions"]},
    {value: 400, rewardText: "Masterwork Weapon, L.Min. Potion", rewards: ["Masterwork Weapon", "Lesser Minor Potions"]},
    {value: 500, rewardText: "Masterwork Weapon, G.Min. Potion", rewards: ["Masterwork Weapon", "Greater Minor Potions"]},
    {value: 750, rewardText: "Masterwork Medium Armor, Masterwork Weapon, 2x L.Min. Potions", rewards: ["Masterwork Medium Armours", "Masterwork Weapon", "Lesser Minor Potions", "Lesser Minor Potions"]},
    {value: 1000, rewardText: "Masterwork Heavy Armor", rewards: ["Masterwork Heavy Armours"]},
    {value: 1500, rewardText: "Masterwork Heavy Armor, Masterwork Weapon, G.Min. Potion", rewards: ["Masterwork Heavy Armours", "Masterwork Weapon", "Greater Minor Potions"]},
    {value: 2000, rewardText: "L.Min. Armor, Masterwork Weapon, 2x G.Min. Potions", rewards: ["Lesser Minor Armour and Shields", "Masterwork Weapon", "Greater Minor Potions", "Greater Minor Potions"]},
    {value: 3000, rewardText: "Masterwork Medium Armor, L.Min. Weapon, G.Min. Potion", rewards: ["Masterwork Medium Armours", "Lesser Minor Weapon", "Greater Minor Potions"]},
    {value: 4000, rewardText: "L.Min. Armor, Masterwork Weapon, L.Min. Wondrous Item, G.Min. Potion", rewards: ["Lesser Minor Armour and Shields", "Masterwork Weapon", "Lesser Minor Wondrous Item", "Greater Minor Potions"]},
    {value: 5000, rewardText: "Masterwork Medium Armor, L.Min. Weapon, L.Min. Wondrous Item, G.Min. Potion", rewards: ["Masterwork Medium Armours", "Lesser Minor Weapon", "Lesser Minor Wondrous Item", "Greater Minor Potions"]},
    {value: 6000, rewardText: "L.Min. Armor, L.Min. Weapon, L.Min. Wondrous Item", rewards: ["Lesser Minor Armour and Shields", "Lesser Minor Weapon", "Lesser Minor Wondrous Item"]},
    {value: 7500, rewardText: "G.Min. Armor, L.Min. Weapon, L.Min. Ring", rewards: ["Greater Minor Armour and Shields", "Lesser Minor Weapon", "Lesser Minor Ring"]},
    {value: 10000, rewardText: "G.Min. Armor, L.Min. Weapon, L.Min. Ring, L.Min. Wondrous Item, 3x G.Min. Potions", rewards: ["Greater Minor Armour and Shields", "Lesser Minor Weapon", "Lesser Minor Ring", "Lesser Minor Wondrous Item", "Greater Minor Potions", "Greater Minor Potions", "Greater Minor Potions"]},
    {value: 10000, rewardText: "G.Min. Armor, G.Min. Weapon, 2x G.Med. Potions", rewards: ["Greater Minor Armour and Shields", "Greater Minor Weapon", "Greater Medium Potions", "Greater Medium Potions"]},
    {value: 12500, rewardText: "G.Min. Armor, L.Min. Weapon, G.Min. Wondrous Item, 2x G.Med. Potions", rewards: ["Greater Minor Armour and Shields", "Lesser Minor Weapon", "Greater Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Potions"]},
    {value: 15000, rewardText: "G.Min. Armor, G.Min. Weapon, G.Min. Ring", rewards: ["Greater Minor Armour and Shields", "Greater Minor Weapon", "Greater Minor Ring"]},
    {value: 20000, rewardText: "L.Med. Armor, G.Min. Weapon, G.Min. Wondrous Item, 2x G.Med. Potions", rewards: ["Lesser Medium Armour and Shields", "Greater Minor Weapon", "Greater Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Potions"]},
    {value: 25000, rewardText: "L.Med. Armor, L.Med. Weapon, L.Min. Ring, L.Min. Wondrous Item, 2x G.Med. Potions", rewards: ["Lesser Medium Armour and Shields", "Lesser Medium Weapon", "Lesser Minor Ring", "Lesser Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Potions"]},
    {value: 30000, rewardText: "L.Med. Armor, L.Med. Weapon, 2x L.Min. Rings, G.Min. Wondrous Items", rewards: ["Lesser Medium Armour and Shields", "Lesser Medium Weapon", "Lesser Minor Ring", "Lesser Minor Ring", "Greater Minor Wondrous Items"]},
    {value: 40000, rewardText: "L.Med. Armor, L.Med. Weapon, L.Med. Ring, G.Min. Wondrous Item, 2x G.Med. Potions", rewards: ["Lesser Medium Armour and Shields", "Lesser Medium Weapon", "Lesser Medium Ring", "Greater Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Potions"]},
    {value: 50000, rewardText: "G.Med. Armor, G.Med. Weapon, L.Med. Wondrous Item, 2x L.Maj. Potions", rewards: ["Greater Medium Armour and Shields", "Greater Medium Weapon", "Lesser Medium Wondrous Item", "Lesser Major Potions", "Lesser Major Potions"]},
    {value: 60000, rewardText: "G.Med. Armor, G.Med. Weapon, 2x G.Min. Rings, 2x G.Min. Wondrous Items", rewards: ["Greater Medium Armour and Shields", "Greater Medium Weapon", "Greater Minor Ring", "Greater Minor Ring", "Greater Minor Wondrous Item", "Greater Minor Wondrous Item"]},
    {value: 75000, rewardText: "L.Maj. Armor, G.Med. Weapon, G.Min. Ring, G.Med. Wondrous Item, 3x G.Maj. Potions", rewards: ["Lesser Major Armour and Shields", "Greater Medium Weapon", "Greater Minor Ring", "Greater Medium Wondrous Item", "Greater Major Potions", "Greater Major Potions", "Greater Major Potions"]},
    {value: 100000, rewardText: "L.Maj. Armor, L.Maj. Weapon, L.Med. Ring, G.Min. Ring, 2x L.Med. Wondrous Items", rewards: ["Lesser Major Armour and Shields", "Lesser Major Weapon", "Lesser Medium Ring", "Greater Minor Ring", "Lesser Medium Wondrous Item", "Lesser Medium Wondrous Item"]},
];
let typeGTreasure = [
    {value: 50, rewardText: "L.Min. Potion", rewards: ["Lesser Minor Potions"]},
    {value: 75, rewardText: "L.Min. Potion, L.Min. Scroll", rewards: ["Lesser Minor Potions", "Lesser Minor Scrolls"]},
    {value: 100, rewardText: "L.Min. Potion, 2x L.Min. Scrolls", rewards: ["Lesser Minor Potions", "Lesser Minor Scrolls", "Lesser Minor Scrolls"]},
    {value: 150, rewardText: "L.Min. Scroll, G.Min. Scroll", rewards: ["Lesser Minor Scrolls", "Greater Minor Scrolls"]},
    {value: 200, rewardText: "2x L.Min. Potions, G.Min. Scroll", rewards: ["Lesser Minor Potions", "Lesser Minor Potions", "Greater Minor Scrolls"]},
    {value: 250, rewardText: "2x G.Min. Scrolls", rewards: ["Greater Minor Scrolls", "Greater Minor Scrolls"]},
    {value: 500, rewardText: "3x L.Min. Potions, 3x G.Min. Scrolls", rewards: ["Lesser Minor Potions", "Lesser Minor Potions", "Lesser Minor Potions", "Greater Minor Scrolls", "Greater Minor Scrolls", "Greater Minor Scrolls"]},
    {value: 750, rewardText: "G.Min. Potion, L.Min. Wand", rewards: ["Greater Minor Potions", "Lesser Minor Wands"]},
    {value: 1000, rewardText: "3x G.Min. Scrolls, L.Min. Wand", rewards: ["Greater Minor Scrolls", "Greater Minor Scrolls", "Greater Minor Scrolls", "Lesser Minor Wands"]},
    {value: 1500, rewardText: "L.Med. Potion, L.Med. Scroll, L.Min. Wand", rewards: ["Lesser Medium Potions", "Lesser Medium Scrolls", "Lesser Minor Wands"]},
    {value: 2000, rewardText: "Masterwork Weapon, 2x L.Med. Scrolls, L.Min. Wand", rewards: ["Masterwork Weapon", "Lesser Medium Scrolls", "Lesser Medium Scrolls", "Lesser Minor Wands"]},
    {value: 2500, rewardText: "2x G.Med. Potions, G.Min. Wand", rewards: ["Greater Medium Potions", "Greater Medium Potions", "Greater Minor Wands"]},
    {value: 3000, rewardText: "G.Med. Potion, 2x L.Med. Scrolls, G.Min. Wand", rewards: ["Greater Medium Potions", "Lesser Medium Scrolls", "Lesser Medium Scrolls", "Greater Minor Wands"]},
    {value: 4000, rewardText: "L.Min. Wondrous Item, G.Med. Potion, G.Min. Wand", rewards: ["Lesser Minor Wondrous Item", "Greater Medium Potions", "Greater Minor Wands"]},
    {value: 5000, rewardText: "L.Min. Ring, L.Min. Wondrous Item, 2x L.Med. Scrolls", rewards: ["Lesser Minor Ring", "Lesser Minor Wondrous Item", "Lesser Medium Scrolls", "Lesser Medium Scrolls"]},
    {value: 6000, rewardText: "L.Min. Ring, L.Min. Wondrous Item, G.Med. Potion, G.Min. Wand", rewards: ["Lesser Minor Ring", "Lesser Minor Wondrous Item", "Greater Medium Potions", "Greater Minor Wands"]},
    {value: 7500, rewardText: "2x G.Med. Potions, L.Min. Scroll, L.Med. Wand", rewards: ["Greater Medium Potions", "Greater Medium Potions", "Lesser Minor Scrolls", "Lesser Medium Wands"]},
    {value: 10000, rewardText: "L.Min. Ring, L.Min. Wondrous Item, L.Med. Wand", rewards: ["Lesser Minor Ring", "Lesser Minor Wondrous Item", "Lesser Medium Wands"]},
    {value: 12500, rewardText: "L.Min. Ring, G.Min. Wondrous Item, 2x G.Med. Scrolls, 2x G.Min. Wands", rewards: ["Lesser Minor Ring", "Greater Minor Wondrous Item", "Greater Medium Scrolls", "Greater Medium Scrolls", "Greater Minor Wands", "Greater Minor Wands"]},
    {value: 15000, rewardText: "L.Min. Ring, L.Med. Rod, L.Med. Wand", rewards: ["Lesser Minor Ring", "Lesser Medium Rods", "Lesser Medium Wands"]},
    {value: 20000, rewardText: "G.Min. Ring, G.Min. Wondrous Item, G.Med. Potion, 2x G.Med. Scrolls, L.Med. Wand", rewards: ["Greater Minor Ring", "Greater Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Scrolls", "Greater Medium Scrolls", "Lesser Medium Wands"]},
    {value: 25000, rewardText: "L.Min. Ring, L.Med. Wand, G.Med. Wand, G.Min. Wondrous Item", rewards: ["Lesser Minor Ring", "Lesser Medium Wands", "Greater Medium Wands", "Greater Minor Wondrous Item"]},
    {value: 30000, rewardText: "G.Min. Ring, L.Med. Wondrous Item, L.Maj. Scroll, G.Med. Wand", rewards: ["Greater Minor Ring", "Lesser Medium Wondrous Item", "Lesser Major Scrolls", "Greater Medium Wands"]},
    {value: 40000, rewardText: "L.Min. Weapon, L.Med. Staff, G.Med. Rod, 2x L.Min. Wondrous Items, L.Med. Wand", rewards: ["Lesser Minor Weapon", "Lesser Medium Staff", "Greater Medium Rods", "Lesser Minor Wondrous Item", "Lesser Minor Wondrous Item", "Lesser Medium Wands"]},
    {value: 50000, rewardText: "G.Min. Ring, 2x L.Med. Wondrous Items, L.Maj. Potion, 3x G.Med. Scrolls, L.Maj. Wand", rewards: ["Greater Minor Ring", "Lesser Medium Wondrous Item", "Lesser Medium Wondrous Item", "Lesser Major Potions", "Greater Medium Scrolls", "Greater Medium Scrolls", "Greater Medium Scrolls", "Lesser Major Wands"]},
    {value: 60000, rewardText: "L.Med. Staff, G.Med. Rod, G.Med. Wondrous Item, G.Med. Potion, 2x L.Maj. Scrolls, L.Med. Wand", rewards: ["Lesser Medium Staff", "Greater Medium Rods", "Greater Medium Wondrous Item", "Greater Medium Potions", "Lesser Major Scrolls", "Lesser Major Scrolls", "Lesser Medium Wands"]},
    {value: 75000, rewardText: "L.Min. Weapon, G.Med. Staff, G.Med. Wondrous Item, 3x G.Maj. Scrolls, G.Maj. Wand", rewards: ["Lesser Minor Weapon", "Greater Medium Staff", "Greater Medium Wondrous Item", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Wands"]},
    {value: 100000, rewardText: "L.Maj. Ring, G.Med. Rod, L.Maj. Staff, L.Maj. Scroll, G.Med. Wand", rewards: ["Lesser Major Ring", "Greater Medium Rods", "Lesser Major Staff", "Lesser Major Scrolls", "Greater Medium Wands"]}
];
let typeHTreasure = [
    {value: 500, rewardText: "Avg 70.5 gp, Masterwork Weapon, L.Min. Potion, L.Min. Scroll, Gr. 2 Gemstone", rewards: ["4d4 * 100 cp", "3d6 * 10 sp", "2d4 * 10 gp", "Masterwork Weapon", "Lesser Minor Potions", "Lesser Minor Scrolls", "Grade 2 Gemstones"]},
    {value: 1000, rewardText: "Avg 96 gp, G.Min. Potion, G.Min. Scroll, L.Min. Wand, 3x Gr. 1 Gemstones", rewards: ["2d4 * 100 cp", "2d6 * 100 sp", "6d6 gp", "Greater Minor Potions", "Greater Minor Scrolls", "Lesser Minor Wands", "Grade 1 Gemstones", "Grade 1 Gemstones", "Grade 1 Gemstones"]},
    {value: 2500, rewardText: "Avg 15.5 gp, Masterwork Heavy Armor, Masterwork Weapon, 2x L.Med. Potions, 2x G.Min. Scrolls, Gr. 2 Gemstone", rewards: ["3d6 * 10 sp", "2d4 gp", "Masterwork Heavy Armours", "Masterwork Weapon", "Lesser Medium Potions", "Lesser Medium Potions", "Greater Minor Scrolls", "Greater Minor Scrolls", "Grade 2 Gemstones"]},
    {value: 5000, rewardText: "Avg 190 gp, Masterwork Weapon, L.Min. Ring, G.Med. Potion, L.Med. Scroll, G.Min. Wand", rewards: ["2d4 * 10 gp", "4d6 pp", "Masterwork Weapon", "Lesser Minor Ring", "Greater Medium Potions", "Lesser Medium Scrolls", "Greater Minor Wands"]},
    {value: 7500, rewardText: "Avg 310 gp, L.Min. Weapon, L.Min. Wondrous Item, 2x G.Med. Potions, G.Min. Wand, 2x Gr. 3 Gemstones", rewards: ["4d4 * 10 gp", "6d6 pp", "Lesser Minor Weapon", "Lesser Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Potions", "Greater Minor Wands", "Grade 3 Gemstones", "Grade 3 Gemstones"]},
    {value: 10000, rewardText: "Avg 430 gp, G.Min. Armor, L.Min. Ring, L.Min. Wondrous Item, L.Med. Scroll, G.Min. Wand, Gr. 4 Gemstone", rewards: ["4d8 * 10 gp", "6d10 pp", "Greater Minor Armour and Shields", "Lesser Minor Ring", "Lesser Minor Wondrous Item", "Lesser Medium Scrolls", "Greater Minor Wands", "Grade 4 Gemstones"]},
    {value: 15000, rewardText: "Avg 1100 gp, G.Min. Armor, L.Min. Wondrous Item, 2x G.Med. Potions, 2x G.Med. Scrolls, L.Med. Wand, Gr. 3 Gemstone", rewards: ["4d4 * 10 gp", "4d4 * 10 pp", "Greater Minor Armour and Shields", "Lesser Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Potions", "Greater Medium Scrolls", "Greater Medium Scrolls", "Lesser Medium Wands", "Grade 3 Gemstones"]},
    {value: 20000, rewardText: "Avg 500 gp, G.Min. Ring, 2x L.Min. Wondrous Items, 2x G.Med. Potions, 2x L.Maj. Scrolls, L.Med. Wand", rewards: ["2d4 * 10 pp", "Greater Minor Ring", "Lesser Minor Wondrous Item", "Lesser Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Potions", "Lesser Major Scrolls", "Lesser Major Scrolls", "Lesser Medium Wands"]},
    {value: 25000, rewardText: "Avg 540 gp, L.Med. Armor, L.Min. Weapon, G.Min. Wondrous Item, 2x L.Maj. Scrolls, L.Med. Wand, Gr. 4 Gemstone", rewards: ["6d10 * 10 gp", "6d6 pp", "Lesser Medium Armour and Shields", "Lesser Minor Weapon", "Greater Minor Wondrous Item", "Lesser Major Scrolls", "Lesser Major Scrolls", "Lesser Medium Wands", "Grade 4 Gemstones"]},
    {value: 30000, rewardText: "Avg 260 gp, G.Min. Weapon, L.Med. Wondrous Item, G.Med. Wand, 3x Gr. 3 Gemstones", rewards: ["6d6 * 10 gp", "2d4 * 10 pp", "Greater Minor Weapon", "Lesser Medium Wondrous Item", "Greater Medium Wands", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones"]},
    {value: 40000, rewardText: "Avg 1100 gp, L.Med. Ring, L.Med. Rod, 2x G.Maj. Potions, 2x L.Maj. Scrolls, L.Maj. Wand", rewards: ["4d4 * 10 gp", "4d4 * 10 pp", "Lesser Medium Ring", "Lesser Medium Rods", "Greater Major Potions", "Greater Major Potions", "Lesser Major Scrolls", "Lesser Major Scrolls", "Lesser Major Wands"]},
    {value: 50000, rewardText: "Avg 100 gp, G.Med. Armor, L.Med. Staff, L.Med. Wondrous Item, G.Maj. Scroll, L.Med. Wand, Gr. 5 Gemstone", rewards: ["4d4 * 10 pp", "Greater Medium Armour and Shields", "Lesser Medium Staff", "Lesser Medium Wondrous Item", "Greater Major Scrolls", "Lesser Medium Wands", "Grade 5 Gemstones"]},
    {value: 75000, rewardText: "Avg 1000 gp, G.Min. Weapon, G.Med. Ring, G.Med. Staff, 3x G.Maj. Potions, G.Maj. Scroll, L.Maj. Wand, Gr. 5 Gemstone", rewards: ["2d8 * 100 gp", "4d4 * 10 pp", "Greater Minor Weapon", "Greater Medium Ring", "Greater Medium Staff", "Greater Major Potions", "Greater Major Potions", "Greater Major Potions", "Greater Major Scrolls", "Lesser Major Wands", "Grade 5 Gemstones"]},
    {value: 100000, rewardText: "Avg 2900 gp, L.Maj. Ring, L.Maj. Wondrous Item, 3x G.Maj. Potions, G.Maj. Scroll, L.Med. Wand, 2x Gr. 5 Gemstones, Gr. 6 Gemstone", rewards: ["8d6 * 100 gp", "4d4 * 10 pp", "Lesser Major Ring", "Lesser Major Wondrous Item", "Greater Major Potions", "Greater Major Potions", "Greater Major Potions", "Greater Major Scrolls", "Lesser Medium Wands", "Grade 5 Gemstones", "Grade 5 Gemstones", "Grade 6 Gemstones"]},
];
let typeITreasure = [
    {value: 5000, rewardText: "Avg 1020 gp, L.Min. Armor, G.Min. Wand, 5x Gr. 3 Gemstones, Gr. 3 Art Object", rewards: ["4d4 * 1000 cp", "6d6 * 100 sp", "2d4 * 100 gp", "6d6 pp", "Lesser Minor Armour and Shields", "Greater Minor Wands", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 3 Art Objects"]},
    {value: 10000, rewardText: "Avg 1020 gp, G.Min. Armor, L.Min. Weapon, L.Min. Wondrous Item, G.Med. Scroll, Gr. 4 Gemstone, Gr. 3 Art Object", rewards: ["4d4 * 1000 cp", "6d6 * 100 sp", "2d4 * 100 gp", "6d6 pp", "Greater Minor Armour and Shields", "Lesser Minor Weapon", "Lesser Minor Wondrous Item", "Greater Medium Scrolls", "Grade 4 Gemstones", "Grade 3 Art Objects"]},
    {value: 15000, rewardText: "Avg 515 gp, G.Min. Ring, 2x L.Min. Wondrous Items, 2x G.Med. Potions, G.Min. Wand, Gr. 4 Gemstone, Gr. 3 Art Object", rewards: ["2d4 * 1000 cp", "6d4 * 100 sp", "3d6 * 10 gp", "6d6 pp", "Greater Minor Ring", "Lesser Minor Wondrous Item", "Lesser Minor Wondrous Item", "Greater Medium Potions", "Greater Medium Potions", "Greater Minor Wands", "Grade 4 Gemstones", "Grade 3 Art Objects"]},
    {value: 20000, rewardText: "Avg 515 gp, G.Min. Armor, L.Med. Rod, G.Min. Wondrous Item, 2x L.Maj. Potions, G.Med. Scroll, 3x Gr. 3 Art Objects", rewards: ["2d4 * 1000 cp", "6d4 * 100 sp", "3d6 * 10 gp", "6d6 pp", "Greater Minor Armour and Shields", "Lesser Medium Rods", "Greater Minor Wondrous Item", "Lesser Major Potions", "Lesser Major Potions", "Greater Medium Scrolls", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects"]},
    {value: 25000, rewardText: "Avg 515 gp, L.Med. Staff, 2x L.Min. Wondrous Items, G.Med. Potion, L.Med. Wand, 2x Gr. 2 Gemstones, 2x Gr. 3 Gemstones, Gr. 4 Gemstone", rewards: ["2d4 * 1000 cp", "6d4 * 100 sp", "3d6 * 10 gp", "6d6 pp", "Lesser Medium Staff", "Lesser Minor Wondrous Item", "Lesser Minor Wondrous Item", "Greater Medium Potions", "Lesser Medium Wands", "Grade 2 Gemstones", "Grade 2 Gemstones", "Grade 3 Gemstones", "Grade 3 Gemstones", "Grade 4 Gemstones"]},
    {value: 30000, rewardText: "Avg 515 gp, L.Med. Armor, G.Min. Weapon, L.Med. Wondrous Item, 2x L.Maj. Scrolls, Gr. 4 Art Object", rewards: ["2d4 * 1000 cp", "6d4 * 100 sp", "3d6 * 10 gp", "6d6 pp", "Lesser Medium Armour and Shields", "Greater Minor Weapon", "Lesser Medium Wondrous Item", "Lesser Major Scrolls", "Lesser Major Scrolls", "Grade 4 Art Objects"]},
    {value: 40000, rewardText: "Avg 1020 gp, L.Med. Weapon, G.Med. Rod, G.Maj. Potion, G.Med. Scroll, L.Med. Wand, 3x Gr. 3 Art Objects, 2x Gr. 4 Art Objects", rewards: ["4d4 * 1000 cp", "6d6 * 100 sp", "2d4 * 100 gp", "6d6 pp", "Lesser Medium Weapon", "Greater Medium Rods", "Greater Major Potions", "Greater Medium Scrolls", "Lesser Medium Wands", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 3 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects"]},
    {value: 50000, rewardText: "Avg 4150 gp, G.Min. Armor, 2x G.Min. Weapons, G.Med. Staff, G.Min. Wondrous Item, Gr. 5 Gemstone", rewards: ["4d4 * 10000 cp", "6d6 * 1000 sp", "4d4 * 100 gp", "2d4 * 10 pp", "Greater Minor Armour and Shields", "Greater Minor Weapon", "Greater Minor Weapon", "Greater Medium Staff", "Greater Minor Wondrous Item", "Grade 5 Gemstones"]},
    {value: 60000, rewardText: "Avg 1550 gp, G.Med. Weapon, G.Med. Rod, L.Med. Wondrous Item, G.Maj. Scroll, 2x G.Min. Wands, Gr. 4 Gemstone, 5x Gr. 2 Art Objects", rewards: ["2d4 * 10000 cp", "2d4 * 1000 sp", "2d4 * 100 gp", "2d4 * 10 pp", "Greater Medium Weapon", "Greater Medium Rods", "Lesser Medium Wondrous Item", "Greater Major Scrolls", "Greater Minor Wands", "Greater Minor Wands", "Grade 4 Gemstones", "Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects", "Grade 2 Art Objects"]},
    {value: 75000, rewardText: "Avg 1550 gp, L.Maj. Armor, G.Med. Ring, L.Med. Staff, G.Med. Wand, Gr. 6 Gemstone, Gr. 4 Art Object", rewards: ["2d4 * 10000 cp", "2d4 * 1000 sp", "2d4 * 100 gp", "2d4 * 10 pp", "Lesser Major Armour and Shields", "Greater Medium Ring", "Lesser Medium Staff", "Greater Medium Wands", "Grade 6 Gemstones", "Grade 4 Art Objects"]},
    {value: 100000, rewardText: "Avg 1550 gp, L.Med. Weapon, G.Med. Ring, L.Maj. Rod, G.Med. Wondrous Item, 2x G.Maj. Potions, L.Med. Scroll, 2x Gr. 4 Art Objects", rewards: ["2d4 * 10000 cp", "2d4 * 1000 sp", "2d4 * 100 gp", "2d4 * 10 pp", "Lesser Medium Weapon", "Greater Medium Ring", "Lesser Major Rods", "Greater Medium Wondrous Item", "Greater Major Potions", "Greater Major Potions", "Lesser Medium Scrolls", "Grade 4 Art Objects", "Grade 4 Art Objects"]},
    {value: 125000, rewardText: "Avg 4190 gp, G.Maj. Armor, L.Med. Weapon, L.Maj. Staff, 2x G.Maj. Scrolls, G.Maj. Wand, Gr. 6 Gemstone, 3x Gr. 4 Art Objects", rewards: ["4d4 * 10000 cp", "6d6 * 1000 sp", "4d4 * 100 gp", "2d8 * 10 pp", "Greater Major Armour and Shields", "Lesser Medium Weapon", "Lesser Major Staff", "Greater Major Scrolls", "Greater Major Scrolls", "Greater Major Wands", "Grade 6 Gemstones", "Grade 4 Art Objects", "Grade 4 Art Objects", "Grade 4 Art Objects"]},
    {value: 150000, rewardText: "Avg 4190 gp, G.Med. Armor, L.Maj. Ring, G.Maj. Wondrous Item, G.Maj. Wand", rewards: ["4d4 * 10000 cp", "6d6 * 1000 sp", "4d4 * 100 gp", "2d8 * 10 pp", "Greater Medium Armour and Shields", "Lesser Major Ring", "Greater Major Wondrous Item", "Greater Major Wands"]},
    {value: 200000, rewardText: "Avg 4190 gp, G.Maj. Weapon, 2x L.Med. Rings, L.Maj. Staff, L.Maj. Wondrous Item, L.Maj. Wand, 3x Gr. 5 Gemstones, Gr. 4 Gemstone", rewards: ["4d4 * 10000 cp", "6d6 * 1000 sp", "4d4 * 100 gp", "2d8 * 10 pp", "Greater Major Weapon", "Lesser Medium Ring", "Lesser Medium Ring", "Lesser Major Staff", "Lesser Major Wondrous Item", "Lesser Major Wands", "Grade 5 Gemstones", "Grade 5 Gemstones", "Grade 5 Gemstones", "Grade 4 Gemstones"]},
    {value: 300000, rewardText: "Avg 8290 gp, G.Maj. Weapon, L.Maj. Ring, G.Maj. Staff, G.Maj. Wondrous Item, G.Med. Wand, Gr. 6 Gemstone, Gr. 6 Art Object", rewards: ["8d4 * 10000 cp", "12d6 * 1000 sp", "8d4 * 100 gp", "2d8 * 10 pp", "Greater Major Weapon", "Lesser Major Ring", "Greater Major Staff", "Greater Major Wondrous Item", "Greater Medium Wands", "Grade 6 Gemstones", "Grade 6 Art Objects"]},
];

let treasureTypes = [typeATreasure, typeBTreasure, typeCTreasure, typeDTreasure, typeETreasure, typeFTreasure, typeGTreasure, typeHTreasure, typeITreasure];

let slowBudgets = [170, 350, 550, 750, 1000, 1350, 1750, 2200, 2850, 3650, 4650, 6000, 7750, 10000, 13000, 16500, 22000, 28000, 35000, 44000];
let medBudgets = [260, 550, 800, 1150, 1550, 2000, 2600, 3350, 4250, 5450, 7000, 9000, 11600, 15000, 19500, 25000, 32000, 41000, 53000, 67000];
let fastBudgets = [400, 800, 1200, 1700, 2300, 3000, 3900, 5000, 6400, 8200, 10500, 13500, 17500, 22000, 29000, 38000, 48000, 62000, 79000, 100000];

let budget = 0;

function customizeTypes(types) {
    const aChecked = (types.includes("A") ? "checked" : "");
    const bChecked = (types.includes("B") ? "checked" : "");
    const cChecked = (types.includes("C") ? "checked" : "");
    const dChecked = (types.includes("D") ? "checked" : "");
    const eChecked = (types.includes("E") ? "checked" : "");
    const fChecked = (types.includes("F") ? "checked" : "");
    const gChecked = (types.includes("G") ? "checked" : "");
    const hChecked = (types.includes("H") ? "checked" : "");
    const iChecked = (types.includes("I") ? "checked" : "");

    let d = new Dialog({
      title: 'Treasure Generator',
      content: `
        <form class="flexcol">
            <div class="form-group">
                <p>
                    <label>
                        <input type="checkbox" name="TypeA" value="A" id="TypeA" ${aChecked}>
                        Type A: Coins</label>
                    <br>
                    <label>
                        <input type="checkbox" name="TypeB" value="B" id="TypeB" ${bChecked}>
                        Type B: Coins and Gems</label>
                    <br>
                    <label>
                        <input type="checkbox" name="TypeC" value="C" id="TypeC" ${cChecked}>
                        Type C: Art Objects</label>
                    <br>
                    <label>
                        <input type="checkbox" name="TypeD" value="D" id="TypeD" ${dChecked}>
                        Type D: Coins and Small Objects</label>
                    <br>
                    <label>
                        <input type="checkbox" name="TypeE" value="E" id="TypeE" ${eChecked}>
                        Type E: Armor and Weapons</label>
                    <br>
                    <label>
                        <input type="checkbox" name="TypeF" value="F" id="TypeF" ${fChecked}>
                        Type F: Combatant Gear</label>
                    <br>
                    <label>
                        <input type="checkbox" name="TypeG" value="G" id="TypeG" ${gChecked}>
                        Type G: Spellcaster Gear</label>
                    <br>
                    <label>
                        <input type="checkbox" name="TypeH" value="H" id="TypeH" ${hChecked}>
                        Type H: Lair Treasure</label>
                    <br>
                    <label>
                        <input type="checkbox" name="TypeI" value="I" id="TypeI" ${iChecked}>
                        Type I: Treasure Hoard</label>
                    <br>
                </p>
            </div>
        </form>
      `,
      buttons: {
        roll: {
          icon: '<i class="fas fa-dice-d20"></i>',
          label: 'Roll Treasure',
          callback: (html) => {
            let checkedList = html.find('[type="checkbox"]:checked');
            let typeList = "";
            for (var i=0; i<checkedList.length; i++) {
                typeList += checkedList[i].value;
            }
            buildTreasure(typeList);
          }
        },
      },
      default: 'roll',
    }).render(true);
}

const buildSelectors = function(selectedTypes) {
    let possibleTypes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    let selectorsMsg = "";

    possibleTypes.forEach(function(type, index) {
        if (selectedTypes.includes(type)) {
            let selectorList = treasureTypes[index].filter(o => o.value <= budget);
            selectorsMsg += `<div class="form-group fexrow" style="flex: 1"><label>Type ${type} Treasures</label><select name="${type}Select" id="${type}Select" style="flex:15;" ${selectorList.length === 0 ? "disabled": ""}>`;
            selectorsMsg += createOptions(type);
            /*if (selectorList.length === 0) {
                selectorsMsg += `<option value="0" disabled>No Options in Budget Range</option>`
            } else {
                selectorList.forEach(function(item, index) {
                    selectorsMsg += `<option value="${index}">${item.value} gp:	${item.rewardText}</option>`;
                });
            }*/
            selectorsMsg += `</select>
                <input type="button" class="addButton" style="flex:1;" value="+ Add" name="${type}" id="${type}AddButton" ${selectorList.length === 0 ? "disabled": ""}>
                </div>`;
        }
    });

    return selectorsMsg;
};

let treasureHoard = [];

function buildTreasure(types) {
    let selectorsMsg = buildSelectors(types);
    treasureHoard = [];
    cpRolls = "";
    spRolls = "";
    gpRolls = "";
    ppRolls = "";

    let x = new Dialog({
      title: 'Treasure Generator',
      content: `
        <form class="flexcol" name="${types}">
            <div name="treasureBudget"><h1>Budget: ${budget} gp</h1></div>
            ${selectorsMsg}
            <p>&bull; Currency Rolls Displayed as Average Total But Will Be Rolled Amounts of Various Currency</p>
            <p>&bull; Abbreviation Legend: L.Min. - Lesser Minor | G.Min. - Greater Minor | Med. - Medium | Maj. - Major | Gr. - Grade</p>
        </form>
        <div class="form-group" style="height: 300px; max-height: 300px; overflow-y: scroll;">
            <h2>Treasure List:</h2>
        </div>
      `,
      buttons: {
        roll: {
          icon: '<i class="fas fa-dice-d20"></i>',
          label: 'Roll Treasure',
          callback: (html) => {
            rollWindow();
          }
        },
      },
      render: (htm) => {
          htm.find('.addButton').click(addTreasure.bind(this));
      },
    }, {width: 1200, height: {}, resizable: false}).render(true);
}

let cpRolls = "";
let spRolls = "";
let gpRolls = "";
let ppRolls = "";

function copperRoll(event) {
	let buttonClicked = event.target;
    buttonClicked.style.background = "red";
	let r = new Roll(cpRolls).roll();
	r.toMessage({flavor: '<h2>Copper Pieces in Treasure:</h2>'});
}

function silverRoll(event) {
	let buttonClicked = event.target;
    buttonClicked.style.background = "red";
	let r = new Roll(spRolls).roll();
	r.toMessage({flavor: '<h2>Silver Pieces in Treasure:</h2>'});
}

function goldRoll(event) {
	let buttonClicked = event.target;
    buttonClicked.style.background = "red";
	let r = new Roll(gpRolls).roll();
	r.toMessage({flavor: '<h2>Gold Pieces in Treasure:</h2>'});
}

function platRoll(event) {
	let buttonClicked = event.target;
    buttonClicked.style.background = "red";
	let r = new Roll(ppRolls).roll();
	r.toMessage({flavor: '<h2>Platinum Pieces in Treasure:</h2>'});
}

function rollWindow() {
    let contentMsg = "<ul>";

	// build currency rolls
    treasureHoard.forEach(function(item) {
		if (item.includes("cp")) {
			if (cpRolls === "") {
				cpRolls += "(" + item.substring(0, item.length - 3) + ")";
			}
			else {
				cpRolls += " + (" + item.substring(0, item.length - 3) + ")";
			}
		}
		else if (item.includes("sp")) {
			if (spRolls === "") {
				spRolls += "(" + item.substring(0, item.length - 3) + ")";
			}
			else {
				spRolls += " + (" + item.substring(0, item.length - 3) + ")";
			}
		}
		else if (item.includes("gp")) {
			if (gpRolls === "") {
				gpRolls += "(" + item.substring(0, item.length - 3) + ")";
			}
			else {
				gpRolls += " + (" + item.substring(0, item.length - 3) + ")";
			}
		}
		else if (item.includes("pp")) {
			if (ppRolls === "") {
				ppRolls += "(" + item.substring(0, item.length - 3) + ")";
			}
			else {
				ppRolls += " + (" + item.substring(0, item.length - 3) + ")";
			}
		}
	});


	treasureHoard = treasureHoard.filter(reward => !reward.includes(" cp"));
	treasureHoard = treasureHoard.filter(reward => !reward.includes(" sp"));
	treasureHoard = treasureHoard.filter(reward => !reward.includes(" gp"));
	treasureHoard = treasureHoard.filter(reward => !reward.includes(" pp"));

	if (cpRolls.length > 0) {
		contentMsg += "<li>" + cpRolls + ` CP <input type="button" id="copperRoll" value="ROLL"></li>`;
	}
	if (spRolls.length > 0) {
		contentMsg += "<li>" + spRolls + ` SP <input type="button" id="silverRoll" value="ROLL"></li>`;
	}
	if (gpRolls.length > 0) {
		contentMsg += "<li>" + gpRolls + ` GP <input type="button" id="goldRoll" value="ROLL"></li>`;
	}
	if (ppRolls.length > 0) {
		contentMsg += "<li>" + ppRolls + ` PP <input type="button" id="platRoll" value="ROLL"></li>`;
	}

	// other rolls
	treasureHoard.sort();
	treasureHoard.forEach(function(item) {
		if (item.includes("Masterwork")) {
			contentMsg += "<li>" + item + ` <input type="button" name="${item.substring(11)}" class="tableRoll" value="ROLL"></li>`;
		}
		else {
			contentMsg += "<li>" + item + ` <input type="button" name="${item}" class="tableRoll" value="ROLL"></li>`;
		}
	});

    let x = new Dialog({
      title: 'Treasure Generator',
      content: `
        <div class="form-group" style="height: 500px; max-height: 500px; overflow-y: scroll;">
            <h2>Treasure List:</h2>
            ${contentMsg}</ul>
        </div>
      `,
      buttons: {
        close: {
          icon: '<i class="fas fa-tick"></i>',
          label: 'Close'
        },
      },
	  default: "close",
	  close: () => {},
      render: (htm) => {
          htm.find('#copperRoll').click(copperRoll.bind(this));
          htm.find('#silverRoll').click(silverRoll.bind(this));
          htm.find('#goldRoll').click(goldRoll.bind(this));
          htm.find('#platRoll').click(platRoll.bind(this));
		  htm.find('.tableRoll').click(tableRoll.bind(this));
      },
    }, {width: 800, height: {}, resizable: false}).render(true);
}

async function tableRoll(event) {
	let buttonClicked = event.target;
	//console.log(event);
    buttonClicked.style.background = "red";
	let tableToRoll = buttonClicked.name;
    let masterwork = buttonClicked.parentElement.innerHTML.includes("Masterwork");

    let compendiumTables = await game.packs.get("pf1e-treasure-generator.tables").getContent();
    let table = await compendiumTables.find(o => o.name === tableToRoll);
    let originalTable = table;
    let result = await table.roll();
    let resultsQueue = [];
    let drawResults = [];

    for (var i = 0; i < result.results.length; i++) {
        resultsQueue.push(result.results[i]);
    }

    while (resultsQueue.length) {
        let resultSearch = resultsQueue.shift();
        let tableSearch = await compendiumTables.find(o => o.name === resultSearch.text);
        if (tableSearch) {
            let newResult = await tableSearch.roll();
            for (var i = 0; i < newResult.results.length; i++) {
                resultsQueue.push(newResult.results[i]);
            }
        }
        else {
            drawResults.push(resultSearch);
        }
    }

    result.results = [];
    for (var i = 0; i < drawResults.length; i++) {
        result.results.push(drawResults[i]);
    }

    if (masterwork) {
        result.results[0].text = "Masterwork " + result.results[0].text;
    }

    originalTable.draw(result);
}

function addTreasure(event) {
    let buttonClicked = event.target;
    let treasureTypeToAdd = buttonClicked.name;
    let treasureToAddIndex = buttonClicked.previousElementSibling.value;
    let selectedTypes = buttonClicked.parentElement.parentElement.name;
    let formParent = buttonClicked.parentElement.parentElement;

    let treasureToAdd = {};
    switch (treasureTypeToAdd) {
        case "A":
            treasureToAdd = typeATreasure[treasureToAddIndex];
            break;
        case "B":
            treasureToAdd = typeBTreasure[treasureToAddIndex];
            break;
        case "C":
            treasureToAdd = typeCTreasure[treasureToAddIndex];
            break;
        case "D":
            treasureToAdd = typeDTreasure[treasureToAddIndex];
            break;
        case "E":
            treasureToAdd = typeETreasure[treasureToAddIndex];
            break;
        case "F":
            treasureToAdd = typeFTreasure[treasureToAddIndex];
            break;
        case "G":
            treasureToAdd = typeGTreasure[treasureToAddIndex];
            break;
        case "H":
            treasureToAdd = typeHTreasure[treasureToAddIndex];
            break;
        case "I":
            treasureToAdd = typeITreasure[treasureToAddIndex];
            break;
    }

    let selectHTMLs = formParent.getElementsByTagName('select');

	treasureToAdd.rewards.forEach(function(item) {
		treasureHoard.push(item);
	})
    budget -= treasureToAdd.value;
    for (var i=0; i<selectHTMLs.length; i++) {
        let selectElement = selectHTMLs[i];
        let optionsHtml = createOptions(selectElement.name.charAt(0));
        let treasureTypeIndex = (selectElement.name.charCodeAt(0) - 65);
        let itemList = treasureTypes[treasureTypeIndex].filter(o => o.value <= budget);

        if (itemList.length === 0) {
            selectElement.nextElementSibling.disabled = true;
            selectElement.disabled = true;
        }
        selectElement.innerHTML = optionsHtml;
    }
    let budgetDiv = formParent.firstElementChild;
    budgetDiv.innerHTML = `<h1>Budget: ${budget} gp</h1>`;
    let treasureDisplayDiv = formParent.nextElementSibling;
    treasureDisplayDiv.innerHTML += `<p>${treasureToAdd.rewardText}</p>`
}

function createOptions(treasureType) {
    let treasureTypeIndex = (treasureType.charCodeAt(0) - 65);
    let itemList = treasureTypes[treasureTypeIndex].filter(o => o.value <= budget);
    let optionsHtml = "";
    if (itemList.length === 0) {
        optionsHtml += `<option value="0" selected>No Options in Budget Range</option>`
    } else {
    itemList.forEach(function(item, index) {
        optionsHtml += `<option value="${index}">${item.value} gp: ${item.rewardText}</option>`;
    });
    }

    return optionsHtml;
}

function calcBudget(html) {
    let level = html.find('[name="levelSelect"]').val();
    let speed = html.find('[name="campaignSpeed"]').val();
    let mult = html.find('[name="multiplier"]').val();

    if (speed === "medium") {
        budget = medBudgets[level - 1];
    }
    else if (speed === "slow") {
        budget = slowBudgets[level - 1];
    }
    else {
        budget = fastBudgets[level - 1];
    }

    if (mult === "incidental") {
        budget /= 2;
    }
    else if (mult === "double") {
        budget *= 2;
    }
    else if (mult === "triple") {
        budget *= 3;
    }
}

canvas.tokens.selectObjects();
function runGenerator() {
    let d = new Dialog({
      title: 'Treasure Generator',
      content: `
        <form class="flexcol">
          <div class="form-group">
            <label for="crSelect">Level</label>
            <select name="levelSelect">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
          </div>
          <div class="form-group">
            <label for="campaignSpeed">Campaign Speed</label>
            <select name="campaignSpeed">
              <option value="medium">Medium</option>
              <option value="slow">Slow</option>
              <option value="fast">Fast</option>
            </select>
          </div>
          <div class="form-group">
            <label for="multiplier">Treasure Value</label>
            <select name="multiplier">
              <option value="normal">Normal</option>
              <option value="incidental">Incidental (1/2)</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
            </select>
          </div>
          <div class="form-group">
            <label for="type">Creature Type</label>
            <select name="type">
                <option value="ABDE">Aberration</option>
                <option value="ABDEFGH">Aberration (Cunning)</option>
                <option value="ABDE">Animal</option>
                <option value="EF">Construct</option>
                <option value="EFBCH">Construct (Guarding Treasure)</option>
                <option value="ABCHI">Dragon</option>
                <option value="BCDG">Fey</option>
                <option value="ABDEFG">Humanoid</option>
                <option value="ABDEFGH">Humanoid (Community)</option>
                <option value="ABDE">Magical Beast</option>
                <option value="ABCDEH">Monstrous Humanoid</option>
                <option value="ABD">Ooze</option>
                <option value="ABCDEFGHI">Outsider</option>
                <option value="ABDE">Plant</option>
                <option value="ABDE">Undead</option>
                <option value="ABDEFG">Undead (Intelligent)</option>
                <option value="ABD">Vermin</option>
            </select>
          </div>
        </form>
      `,
      buttons: {
        custom: {
          icon: '<i class="fas fa-check-square"></i>',
          label: 'Customize Treasure Types',
          callback: (html) => {
              let types = html.find('[name="type"]').val();

              calcBudget(html);
              customizeTypes(types);
            }
        },
        roll: {
          icon: '<i class="fas fa-dice-d20"></i>',
          label: 'Roll Treasure',
          callback: (html) => {
            let types = html.find('[name="type"]').val();
            calcBudget(html);

            buildTreasure(types);
          }
        },
      },
      default: 'roll',
    }).render(true);
}
