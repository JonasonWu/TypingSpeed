
function TSTexts() {
    //Texts are taken from wiki
    const texts = {
        //https://en.wikipedia.org/wiki/Penguin
        0: "Penguins are a group of aquatic flightless birds. They live almost exclusively in the southern hemisphere. Highly adapted for life in the water, penguins have countershaded dark and white plumage and flippers for swimming. Most penguins feed on krill, fish, squid and other forms of sea life which they catch while swimming underwater. They spend roughly half of their lives on land and the other half in the sea.",
        //https://en.wikipedia.org/wiki/Poison_dart_frog
        1: "Poison dart frogs are native to tropical Central and South America. These species are diurnal and often have brightly colored bodies. They derive their great toxicity from their diet of ants, mites, and termites. Other species, however, exhibit cryptic coloration and little to no amounts of toxicity and eat a much larger variety of prey. Many species of this family are threatened due to human infrastructure encroaching on their habitats.",
        //https://en.wikipedia.org/wiki/Water_park
        2: "A water park or waterpark is an amusement park that features water play areas such as swimming pools, water slides, splash pads, water playgrounds, and lazy rivers, as well as areas for floating, bathing, swimming, and other barefoot environments. Modern water parks may also be equipped with some type of artificial surfing or bodyboarding environment, such as a wave pool or flowrider.",
        //https://en.wikipedia.org/wiki/Halloween
        3: "One theory holds that many Halloween traditions may have been influenced by ancient Celtic harvest festivals, particularly the Gaelic festival Samhain, which may have had pagan roots; some scholars hold that Samhain may have been Christianized as All Hallow's Day, along with its eve, by the early Church. Other academics believe, however, that Halloween began solely as a Christian holiday, being the vigil of All Hallow's Day.",
        //https://en.wikipedia.org/wiki/Cancer
        4: "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body. These contrast with benign tumors, which do not spread. Possible signs and symptoms include a lump, abnormal bleeding, prolonged cough, unexplained weight loss, and a change in bowel movements. While these symptoms may indicate cancer, they can also have other causes. Over 100 types of cancers affect humans.",
    }
    //Get a random text to be the one to be shown by user
    let num = Math.floor(Math.random() * Object.keys(texts).length);
    return texts[num];
}

export default TSTexts;