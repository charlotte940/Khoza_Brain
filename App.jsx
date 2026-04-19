import { useState, useEffect, useRef, useCallback } from "react";

const CATEGORIES = {
countries:{label:"Countries",emoji:"🌍",color:"#00e5ff",
data:{A:["Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan"],B:["Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burundi"],C:["Cambodia","Cameroon","Canada","Chad","Chile","China","Colombia","Congo","Costa Rica","Croatia","Cuba","Cyprus"],D:["Denmark","Djibouti","Dominican Republic"],E:["Ecuador","Egypt","El Salvador","Eritrea","Estonia","Ethiopia"],F:["Fiji","Finland","France"],G:["Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guyana"],H:["Haiti","Honduras","Hungary"],I:["Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy"],J:["Jamaica","Japan","Jordan"],K:["Kazakhstan","Kenya","Kuwait","Kyrgyzstan"],L:["Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg"],M:["Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar"],N:["Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway"],O:["Oman"],P:["Pakistan","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"],Q:["Qatar"],R:["Romania","Russia","Rwanda"],S:["Samoa","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria"],T:["Taiwan","Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan"],U:["Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan"],V:["Vanuatu","Vatican City","Venezuela","Vietnam"],W:["Western Sahara"],Y:["Yemen"],Z:["Zambia","Zimbabwe"]},
facts:{"Australia":["Australia is the only continent that is also a single country.","There are more kangaroos than people in Australia."],"Brazil":["Brazil is the only Portuguese-speaking country in the Americas.","Brazil has won the FIFA World Cup five times."],"Canada":["Canada has more lakes than the rest of the world combined.","Canada and the USA share the world's longest undefended border."],"China":["China invented paper, printing, gunpowder and the compass.","China has over 1 billion internet users."],"Egypt":["The Great Pyramid is the only surviving Ancient Wonder of the World.","Cleopatra lived closer to the Moon landing than to the pyramids being built."],"France":["France is the most visited country on Earth.","The Eiffel Tower grows 15cm taller every summer."],"Germany":["Germany has over 1,500 varieties of beer.","Germany invented the automobile, printing press, and aspirin."],"India":["India invented chess, yoga, and the number zero.","India has more vegetarians than the rest of the world combined."],"Japan":["Japan's monarchy is the world's oldest — over 2,600 years.","Japan has one vending machine for every 23 people."],"Kenya":["Kenya's Maasai Mara hosts 1.5 million wildebeest in the Great Migration.","The Great Rift Valley runs through Kenya."],"Nigeria":["Nigeria is Africa's most populous nation — over 220 million people.","Nigeria has over 500 spoken languages."],"Russia":["Russia spans 11 time zones — the most of any country.","Lake Baikal contains 20% of the world's unfrozen fresh water."],"South Africa":["South Africa has 11 official languages — more than any other country.","The world's largest diamond was found in South Africa."],"United Kingdom":["The UK invented the World Wide Web, telephone and steam engine.","London's Underground opened in 1863 — the world's oldest metro."],"United States":["The USA has won more Olympic medals than any other country.","The Grand Canyon has its own weather system."],"Zimbabwe":["Zimbabwe's Victoria Falls is twice the height of Niagara Falls.","Zimbabwe once printed a 100 trillion dollar banknote."],"Zambia":["Zambia shares Victoria Falls with Zimbabwe.","Zambia has over 70 ethnic groups."]},
defaultFact:(w)=>`${w} is a sovereign nation with a unique culture, history and people.`},
vegetables:{label:"Vegetables",emoji:"🥦",color:"#69ff47",
data:{A:["Artichoke","Arugula","Asparagus","Aubergine"],B:["Beetroot","Bok Choy","Broccoli","Brussels Sprouts","Butternut Squash"],C:["Cabbage","Carrot","Cauliflower","Celery","Courgette","Cucumber"],D:["Daikon"],E:["Edamame","Endive"],F:["Fennel"],G:["Garlic","Ginger","Green Bean","Green Pepper"],H:["Horseradish"],J:["Jalapeño"],K:["Kale","Kohlrabi"],L:["Leek","Lettuce"],M:["Mushroom","Mustard Greens"],N:["Napa Cabbage"],O:["Okra","Onion"],P:["Parsnip","Pea","Pepper","Potato","Pumpkin"],R:["Radish","Rocket","Runner Bean"],S:["Shallot","Spinach","Spring Onion","Squash","Sweet Potato","Sweetcorn"],T:["Tomato","Turnip"],W:["Watercress"],Y:["Yam"],Z:["Zucchini"]},
facts:{"Carrot":["Carrots were originally purple — orange was cultivated in the Netherlands.","Carrots contain beta-carotene which converts to Vitamin A."],"Broccoli":["Broccoli contains more Vitamin C per 100g than an orange.","Broccoli is man-made, developed from wild cabbage 2,000 years ago."],"Potato":["There are over 4,000 varieties of potato worldwide.","Potatoes were the first vegetable grown in space in 1995."],"Tomato":["Tomatoes are technically a fruit — they contain seeds.","There are over 10,000 known varieties of tomato."],"Garlic":["Garlic has been used as medicine for over 5,000 years.","Ancient Egyptian workers were paid in garlic."],"Mushroom":["Mushrooms are more closely related to animals than to plants.","A single fungal network in Oregon covers 2,385 acres."],"Onion":["Onions make you cry because they release sulphuric compounds when cut.","Onions have been cultivated for over 5,000 years."],"Kale":["Kale contains more iron per calorie than beef.","The UK grew more kale in World War II than any other vegetable."],"Pumpkin":["Pumpkins are 90% water.","The world's heaviest pumpkin weighed over 1,200 kg."],"Spinach":["Spinach contains all 13 vitamins.","Spinach was the first vegetable sold frozen, in 1930."]},
defaultFact:(w)=>`${w} is a nutritious vegetable enjoyed around the world.`},
fruits:{label:"Fruits",emoji:"🍓",color:"#ff4d6d",
data:{A:["Apple","Apricot","Avocado"],B:["Banana","Blackberry","Blueberry"],C:["Cherry","Clementine","Coconut","Cranberry"],D:["Date","Dragonfruit","Durian"],F:["Fig"],G:["Gooseberry","Grape","Grapefruit","Guava"],H:["Honeydew"],J:["Jackfruit"],K:["Kiwi","Kumquat"],L:["Lemon","Lime","Lychee"],M:["Mandarin","Mango","Mulberry"],N:["Nectarine"],O:["Orange"],P:["Papaya","Passionfruit","Peach","Pear","Pineapple","Plum","Pomegranate"],Q:["Quince"],R:["Raspberry"],S:["Starfruit","Strawberry"],T:["Tamarind","Tangerine"],W:["Watermelon"]},
facts:{"Banana":["Bananas are technically berries — but strawberries are not.","Bananas share about 60% of their DNA with humans."],"Apple":["There are over 7,500 varieties of apple.","Apples float in water because 25% of their volume is air."],"Watermelon":["Watermelons are 92% water.","The world's heaviest watermelon weighed 159 kg."],"Mango":["Mango is the national fruit of India, Pakistan and the Philippines.","There are over 500 varieties of mango."],"Pineapple":["It takes nearly 3 years for a single pineapple to grow.","Pineapple's bromelain enzyme can digest protein."],"Strawberry":["Strawberries are the only fruit with seeds on the outside.","Strawberries are not technically berries."],"Avocado":["Avocados are technically berries with a single large seed.","Avocado trees need another tree nearby to produce fruit."],"Durian":["Durian is banned on Singapore's public transport due to its smell.","Despite its smell, durian is called the King of Fruits."],"Lemon":["Lemons don't occur naturally in the wild — they're a hybrid fruit.","Lemon juice was used as invisible ink in ancient times."],"Coconut":["Coconuts can float for months and still germinate.","The coconut palm is called the Tree of Life in tropical cultures."]},
defaultFact:(w)=>`${w} is a delicious fruit enjoyed fresh, dried or cooked around the world.`},
colours:{label:"Colours",emoji:"🎨",color:"#bf5af2",
data:{A:["Amber","Amethyst","Apricot","Aqua","Aquamarine","Auburn","Azure"],B:["Beige","Black","Blue","Bronze","Brown","Burgundy"],C:["Caramel","Cerise","Cerulean","Chartreuse","Chocolate","Cobalt","Coral","Cream","Crimson","Cyan"],D:["Denim"],E:["Ebony","Ecru","Emerald"],F:["Fuchsia"],G:["Gold","Green","Grey"],H:["Hazel"],I:["Indigo","Ivory"],J:["Jade"],K:["Khaki"],L:["Lavender","Lilac","Lime"],M:["Magenta","Maroon","Mauve","Mint","Mocha","Mustard"],N:["Navy"],O:["Ochre","Olive","Orange"],P:["Peach","Pearl","Pink","Plum","Purple"],R:["Red","Rose","Ruby","Rust"],S:["Sage","Salmon","Scarlet","Silver","Slate"],T:["Tan","Teal","Terracotta","Turquoise"],V:["Violet"],W:["White"],Y:["Yellow"]},
facts:{"Red":["Red is the first colour babies can see after black and white.","Red is the most common colour on national flags worldwide."],"Blue":["Blue is the world's favourite colour — chosen by 40% of people.","There was no word for blue in ancient Greek or Japanese."],"Green":["Green is the easiest colour for the human eye to detect.","Green rooms exist backstage because green reduces anxiety."],"Purple":["Purple was the most expensive colour in ancient times — made from sea snails.","Only royalty could legally wear purple in ancient Rome."],"Orange":["Orange is the only colour named after an object — the fruit came first.","Orange improves oxygen supply to the brain."],"Black":["Black is technically the absence of all visible light.","Black objects heat up faster in sunlight because they absorb all wavelengths."],"White":["White reflects all wavelengths of visible light.","In many East Asian cultures, white is the colour of mourning."],"Indigo":["Indigo was one of Isaac Newton's original 7 rainbow colours.","Natural indigo dye was once called Blue Gold."],"Turquoise":["Turquoise has been prized since 5000 BC.","In Native American cultures, turquoise is considered sacred."],"Gold":["Gold has been a symbol of wealth for over 6,000 years.","The word gold comes from Old English meaning yellow."],"Pink":["In the 18th century, pink was considered masculine and blue was feminine.","Seeing pink reduces aggression and heart rate."],"Silver":["Silver is the most reflective of all metals.","Silver has been used as a natural antibacterial agent for thousands of years."]},
defaultFact:(w)=>`${w} is a beautiful colour found throughout nature, art and design.`},
cars:{label:"Car Brands",emoji:"🚗",color:"#ff9f43",
data:{A:["Alfa Romeo","Aston Martin","Audi","Acura"],B:["Bentley","BMW","Bugatti","Buick"],C:["Cadillac","Chevrolet","Chrysler","Citroën"],D:["Dacia","Dodge"],F:["Ferrari","Fiat","Ford"],G:["Genesis","GMC"],H:["Honda","Hyundai"],I:["Infiniti"],J:["Jaguar","Jeep"],K:["Kia","Koenigsegg"],L:["Lamborghini","Land Rover","Lexus","Lincoln"],M:["Maserati","Mazda","McLaren","Mercedes-Benz","Mini","Mitsubishi"],N:["Nissan"],O:["Opel"],P:["Pagani","Peugeot","Porsche"],R:["Ram","Renault","Rolls-Royce"],S:["SEAT","Skoda","Subaru","Suzuki"],T:["Tesla","Toyota"],V:["Vauxhall","Volkswagen","Volvo"]},
facts:{"Ferrari":["Ferrari only produces around 10,000 cars per year.","The prancing horse logo came from a WWI fighter pilot's plane."],"Volkswagen":["Volkswagen means People's Car in German.","Volkswagen owns Bentley, Bugatti, Lamborghini, Audi, and Porsche."],"Toyota":["Toyota is the world's largest car manufacturer by volume.","Toyota's production system is the gold standard of manufacturing efficiency."],"Rolls-Royce":["Every Rolls-Royce is hand-built and takes about 6 months.","The Spirit of Ecstasy hood ornament has been used since 1911."],"Lamborghini":["Lamborghini was founded because Ferruccio was unhappy with his Ferrari.","Lamborghini originally made tractors before making supercars."],"Tesla":["Tesla's Model S does 0-100 km/h in under 2 seconds.","Tesla was named after inventor Nikola Tesla."],"BMW":["BMW stands for Bayerische Motoren Werke — Bavarian Motor Works.","BMW's logo represents a spinning propeller — they made aircraft engines."],"Porsche":["Porsche's most profitable product is the Cayenne SUV.","Ferdinand Porsche also designed the original Volkswagen Beetle."],"Ford":["Ford introduced the world's first moving assembly line in 1913.","The Ford Model T was the first mass-produced affordable car."],"Volvo":["Volvo invented the three-point seatbelt and gave the patent away to save lives.","Volvo comes from the Latin meaning I roll."],"Land Rover":["Land Rover was designed using surplus aluminium after World War II.","80% of all Land Rovers ever built are still working."]},
defaultFact:(w)=>`${w} is an iconic car brand with a rich history of engineering and design.`},
animals:{label:"Animals",emoji:"🦁",color:"#ffd32a",
data:{A:["Aardvark","Albatross","Alligator","Alpaca","Anaconda","Antelope","Armadillo"],B:["Baboon","Badger","Bat","Bear","Beaver","Bison","Buffalo"],C:["Camel","Capybara","Cheetah","Chimpanzee","Cobra","Crocodile"],D:["Deer","Dingo","Dolphin","Donkey"],E:["Eagle","Elephant","Elk","Emu"],F:["Flamingo","Fox","Frog"],G:["Gazelle","Giraffe","Gorilla"],H:["Hamster","Hedgehog","Hippopotamus","Horse","Hyena"],I:["Iguana","Impala"],J:["Jaguar","Jellyfish"],K:["Kangaroo","Koala","Komodo Dragon"],L:["Lemur","Leopard","Lion","Llama","Lynx"],M:["Manatee","Mongoose","Moose"],N:["Narwhal"],O:["Octopus","Orangutan","Ostrich","Otter"],P:["Panda","Penguin","Platypus","Polar Bear"],Q:["Quokka"],R:["Rabbit","Raccoon","Rhino"],S:["Shark","Sloth","Swan"],T:["Tiger","Tortoise","Toucan"],W:["Walrus","Warthog","Wolf","Wombat"],Y:["Yak"],Z:["Zebra"]},
facts:{"Elephant":["Elephants are the only animals that can't jump.","Elephants can recognise themselves in a mirror."],"Giraffe":["Giraffes only need 30 minutes of sleep per day.","A giraffe's tongue is 45cm long and dark purple to protect from sunburn."],"Cheetah":["The cheetah reaches 112 km/h — the fastest land animal.","Cheetahs don't roar — they chirp and purr like domestic cats."],"Platypus":["The platypus is one of the only venomous mammals.","The platypus uses electroreception to detect prey underwater."],"Octopus":["An octopus has three hearts and blue blood.","Octopuses can open jars and use tools."],"Dolphin":["Dolphins sleep with one eye open.","Dolphins have unique whistles that act as names for each other."],"Penguin":["Penguins propose to their mates with a pebble.","Emperor penguins can hold their breath for 22 minutes."],"Kangaroo":["Kangaroos can't walk backwards.","A baby kangaroo is only 2cm long at birth."],"Sloth":["Sloths move so slowly that algae grows on their fur.","Sloths can hold their breath for up to 40 minutes."],"Narwhal":["The narwhal's tusk is a spiral tooth up to 3 metres long.","Narwhals have been called the unicorns of the sea."],"Quokka":["The quokka is known as the world's happiest animal.","Quokkas are found almost exclusively on Rottnest Island."],"Capybara":["The capybara is the world's largest rodent.","Capybaras are so calm that other animals sit on them."],"Lion":["Lions are the only cats that live in groups — called prides.","A lion's roar can be heard up to 8 km away."]},
defaultFact:(w)=>`${w} is a fascinating animal found in ecosystems around the world.`},
cities:{label:"Cities",emoji:"🏙️",color:"#00cfff",
data:{A:["Abu Dhabi","Accra","Addis Ababa","Amsterdam","Ankara","Athens","Atlanta"],B:["Baghdad","Bangkok","Barcelona","Beijing","Belgrade","Berlin","Bogota","Brussels","Buenos Aires"],C:["Cairo","Cape Town","Casablanca","Chicago"],D:["Dakar","Dallas","Delhi","Dubai","Dublin"],E:["Edinburgh"],F:["Florence","Frankfurt"],G:["Geneva","Guangzhou"],H:["Hamburg","Hanoi","Havana","Helsinki","Hong Kong"],I:["Istanbul"],J:["Jakarta","Johannesburg"],K:["Kabul","Kampala","Karachi","Kuala Lumpur"],L:["Lagos","Lahore","Lima","Lisbon","London","Los Angeles","Lusaka"],M:["Madrid","Manila","Melbourne","Mexico City","Miami","Milan","Montreal","Moscow","Mumbai"],N:["Nairobi","Naples","New York"],O:["Oslo"],P:["Paris","Prague"],R:["Riyadh","Rome"],S:["Santiago","Seoul","Shanghai","Singapore","Stockholm","Sydney"],T:["Tehran","Tokyo","Toronto"],V:["Vancouver","Vienna"],W:["Warsaw"],Y:["Yangon"],Z:["Zurich"]},
facts:{"Tokyo":["Tokyo is the most populated metro area — over 37 million people.","Tokyo has more Michelin-starred restaurants than any other city."],"London":["London has been continuously inhabited for over 2,000 years.","London's Underground opened in 1863 — the world's oldest metro."],"New York":["New York has 800 languages spoken — the most diverse city on Earth.","Central Park was entirely man-made, built in the 1850s."],"Dubai":["Dubai has the world's tallest building — the Burj Khalifa at 828 metres.","Dubai went from a fishing village to global metropolis in 50 years."],"Paris":["The Louvre is the world's most visited museum — 9 million visitors a year.","Paris was originally a small island settlement called Lutetia."],"Cape Town":["Table Mountain is 600 million years old.","Cape Town sits where the Atlantic and Indian Oceans meet."],"Singapore":["Singapore is one of only three city-states in the world.","Singapore has no natural freshwater — it recycles all its water."],"Istanbul":["Istanbul is the only city spanning two continents — Europe and Asia.","Istanbul has been the capital of three great empires."],"Lagos":["Lagos is Africa's largest city with up to 24 million people.","Lagos is one of the fastest-growing cities in the world."],"Johannesburg":["Johannesburg was built on the world's largest gold deposit.","Johannesburg is known as the City of Gold — eGoli in Zulu."]},
defaultFact:(w)=>`${w} is a vibrant city with a unique history, culture and character.`},
};

// General: a mixed category drawing from everything above.
(function buildGeneral(){
  const data={}, facts={};
  for(const k of Object.keys(CATEGORIES)){
    const c=CATEGORIES[k];
    for(const [L,items] of Object.entries(c.data)){
      if(!data[L]) data[L]=[];
      for(const it of items) if(!data[L].includes(it)) data[L].push(it);
    }
    for(const [k2,v] of Object.entries(c.facts)) if(!facts[k2]) facts[k2]=v;
  }
  for(const L of Object.keys(data)) data[L].sort();
  CATEGORIES.general={label:"General",emoji:"🧠",color:"#ff9ec4",data,facts,
    defaultFact:(w)=>`${w} — great answer!`};
})();

const ALL_CATS=Object.keys(CATEGORIES);
function getItems(cat,ltr){return CATEGORIES[cat]?.data[ltr]||[];}
function getFactFor(cat,item){const f=CATEGORIES[cat]?.facts[item];if(f)return f[Math.floor(Math.random()*f.length)];return CATEGORIES[cat]?.defaultFact(item)||`${item} — great answer!`;}

const TIMER_MAX=50;
const fmtTime=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const PRE_TURN_SECS=5;

// Custom SVG glyphs per category — drawn into slices so we don't rely on emoji.
const CAT_SINGULAR={countries:"country",vegetables:"vegetable",fruits:"fruit",colours:"colour",cars:"car brand",animals:"animal",cities:"city",general:"word"};

const CAT_ICONS={
countries:<g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"><circle cx="0" cy="0" r="7"/><ellipse cx="0" cy="0" rx="3" ry="7"/><line x1="-7" y1="0" x2="7" y2="0"/></g>,
vegetables:<g><path d="M -3 -4 Q -1 -8 1 -5 Q 3 -8 4 -4 Q 6 -3 4 -1 L 2 6 Q 0 8 -2 6 L -4 -1 Q -6 -3 -3 -4 Z" fill="#fff"/><path d="M 0 -5 L 0 -8" stroke="#2e7d2e" strokeWidth="1.5" strokeLinecap="round"/></g>,
fruits:<g><circle cx="0" cy="1" r="5.5" fill="#fff"/><path d="M 0 -4 Q 1 -7 3 -7" fill="none" stroke="#3aa23a" strokeWidth="1.6" strokeLinecap="round"/><path d="M 2 -5 Q 4 -4 5 -6" fill="#3aa23a" stroke="none"/></g>,
colours:<g><circle cx="-3" cy="-1" r="2.6" fill="#ff4d6d"/><circle cx="3" cy="-1" r="2.6" fill="#00b7ff"/><circle cx="-2" cy="4" r="2.6" fill="#ffd32a"/><circle cx="3" cy="4" r="2.6" fill="#69ff47"/></g>,
cars:<g fill="#fff"><rect x="-7" y="-1" width="14" height="5" rx="2"/><path d="M -5 -1 L -3 -5 L 3 -5 L 5 -1 Z"/><circle cx="-4" cy="5" r="2" fill="#222"/><circle cx="4" cy="5" r="2" fill="#222"/></g>,
animals:<g fill="#fff"><ellipse cx="0" cy="3" rx="4" ry="3.2"/><circle cx="-4" cy="-2" r="1.8"/><circle cx="4" cy="-2" r="1.8"/><circle cx="-6" cy="1.5" r="1.5"/><circle cx="6" cy="1.5" r="1.5"/></g>,
cities:<g fill="#fff"><rect x="-7" y="-2" width="3" height="9"/><rect x="-3" y="-6" width="3" height="13"/><rect x="1" y="-4" width="3" height="11"/><rect x="5" y="-1" width="2" height="8"/></g>,
general:<g><text x="0" y="5" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff" fontFamily="'Black Han Sans',sans-serif">?</text></g>,
};

const BRAIN_SVG=(
<svg viewBox="-12 -12 24 24">
  <g fill="#ff7fa0" stroke="#6b1a2e" strokeWidth="1.2" strokeLinejoin="round">
    <path d="M -1 -9 Q -7 -9 -8 -3 Q -11 -1 -9 3 Q -10 7 -5 8 Q -3 10 -1 8 Z"/>
    <path d="M 1 -9 Q 7 -9 8 -3 Q 11 -1 9 3 Q 10 7 5 8 Q 3 10 1 8 Z"/>
  </g>
  <g fill="none" stroke="#6b1a2e" strokeWidth="0.8" strokeLinecap="round">
    <path d="M -1 -6 Q -4 -5 -4 -2 Q -6 0 -4 2 Q -6 5 -3 6"/>
    <path d="M 1 -6 Q 4 -5 4 -2 Q 6 0 4 2 Q 6 5 3 6"/>
  </g>
</svg>
);
const SLOT_COLORS=["#00e5ff","#ff4d6d","#69ff47","#bf5af2","#ff9f43","#ffd32a","#00cfff","#ff6eb4"];
const SLOT_EMOJIS=["🦁","🐯","🦊","🐺","🦅","🐉","🦈","🦋"];

const BRAGGING_RIGHTS=[
"Every Khoza must salute you when you enter the room — for the rest of the day",
"Everyone must refer to you as \"The Genius\" for the rest of the evening",
"Every family member must bow their head when you walk past — until bedtime",
"You get the TV remote for the rest of the night. No negotiation",
"You choose what's for dinner — final say, no debate",
"You are exempt from clearing the table tonight",
"Everyone must stand when you enter any room for the next hour",
"Everyone must agree with everything you say for the next 30 minutes",
"Everyone must address you as \"Your Excellency\" until midnight",
"The family must applaud when you sit down to eat",
"You get first pick of everything for the rest of the day",
"Everyone owes you one favour — to be claimed whenever you want",
"You skip your chores today. No questions asked",
"Everyone must compliment you once every hour for the rest of the day",
"You get the best seat in the house — for the entire evening",
];

const FORFEITS=[
"Must make tea or coffee for everyone — right now",
"Has to do the dishes tonight — alone",
"Must say \"You are so right\" to the winner every time they speak — for one hour",
"Owes everyone a snack of their choice",
"Has to do one dare chosen by the winner",
"Must give the winner a round of applause every time they walk in — for the rest of the day",
"Has to tell the winner one genuine compliment in front of everyone",
"Must refer to the winner as \"The Champion\" for the rest of the evening",
"Owes the winner one favour — no questions asked",
"Has to carry the winner's plate to the table at the next meal",
];

const css=`
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=DM+Sans:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{–bg:#0d1117;–bg2:rgba(255,255,255,0.04);–line:rgba(255,255,255,0.08);–muted:rgba(255,255,255,0.38);–faint:rgba(255,255,255,0.05);}
html,body{width:100%;height:100%;overflow:hidden;background:var(–bg);font-family:'DM Sans',sans-serif;color:#fff;touch-action:manipulation;-webkit-tap-highlight-color:transparent;}
.app{width:100vw;height:100vh;position:relative;overflow:hidden;
background:
radial-gradient(ellipse 70% 60% at 10% 10%,rgba(0,229,255,0.07) 0%,transparent 55%),
radial-gradient(ellipse 60% 50% at 90% 90%,rgba(105,255,71,0.05) 0%,transparent 55%),
radial-gradient(ellipse 50% 40% at 50% 50%,rgba(191,90,242,0.04) 0%,transparent 60%),
#0d1117;}
.scanlines{position:fixed;inset:0;z-index:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 3px);}
.vignette{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 100% 100% at 50% 50%,transparent 40%,rgba(0,0,0,0.6) 100%);}

/* LANDING */
.landing{position:fixed;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;}
.landing-title{font-family:'Black Han Sans',sans-serif;text-align:center;line-height:1.05;animation:titleIn 1s cubic-bezier(.34,1.2,.64,1);position:relative;z-index:1;}
@keyframes titleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
.lt-family{font-size:13px;letter-spacing:6px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:12px;display:block;}
.lt-last{font-size:clamp(44px,9vw,80px);background:linear-gradient(150deg,#fff 30%,rgba(255,255,255,.55));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.lt-brain{font-size:clamp(44px,9vw,80px);background:linear-gradient(135deg,#00e5ff,#69ff47);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 24px rgba(0,229,255,0.4));}
.lt-standing{font-size:clamp(44px,9vw,80px);background:linear-gradient(150deg,#fff 30%,rgba(255,255,255,.55));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.lt-tap{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-top:36px;animation:tapBlink 2s ease-in-out infinite;position:relative;z-index:1;}
@keyframes tapBlink{0%,100%{opacity:.2}50%{opacity:.5}}
.lt-p{position:absolute;border-radius:50%;animation:pFloat linear infinite;}
@keyframes pFloat{0%{transform:translateY(110vh);opacity:0}10%{opacity:.6}90%{opacity:.2}100%{transform:translateY(-10vh);opacity:0}}

/* FLOW — setup screen: same atmosphere as landing */
.flow{position:fixed;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px;gap:14px;overflow-y:auto;animation:fIn .35s ease;}
@keyframes fIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

/* title in setup — same gradient as landing */
.setup-family{font-family:'Black Han Sans',sans-serif;font-size:12px;letter-spacing:6px;text-transform:uppercase;color:rgba(255,255,255,.28);text-align:center;display:block;margin-bottom:6px;}
.setup-logo{font-family:'Black Han Sans',sans-serif;text-align:center;line-height:1;}
.setup-logo .s-last{font-size:clamp(28px,6vw,40px);background:linear-gradient(150deg,#fff 30%,rgba(255,255,255,.55));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.setup-logo .s-brain{font-size:clamp(28px,6vw,40px);background:linear-gradient(135deg,#00e5ff,#69ff47);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 14px rgba(0,229,255,0.35));}
.setup-logo .s-stand{font-size:clamp(28px,6vw,40px);background:linear-gradient(150deg,#fff 30%,rgba(255,255,255,.55));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}

/* setup card — glass, not opaque dark box */
.setup-card{
width:100%;max-width:480px;
background:rgba(255,255,255,0.03);
border:1px solid rgba(255,255,255,0.08);
border-radius:20px;padding:18px;
backdrop-filter:blur(20px);
}

/* category pills — no emoji, just clean text */
.cat-pill{
padding:8px 14px;border-radius:20px;border:1px solid;
font-family:'Black Han Sans',sans-serif;font-size:12px;
cursor:pointer;transition:all .18s;letter-spacing:.5px;
background:transparent;
}
.cat-pill:hover{transform:translateY(-1px);}

/* player row — clean, no emoji */
.prow{
display:flex;align-items:center;gap:10px;
padding:9px 12px;border-radius:10px;
border:1px solid rgba(255,255,255,.07);
background:rgba(255,255,255,.025);
margin-bottom:5px;
}
.prow-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.prow-name{flex:1;font-weight:700;font-size:13px;letter-spacing:.3px;}
.prow-lives{display:flex;gap:3px;}
.prow-heart{font-size:11px;}
.prow-heart.dim{opacity:.15;filter:grayscale(1);}

/* lives selector — text based */
.life-sel{display:flex;gap:7px;}
.life-pill{flex:1;padding:9px;border-radius:9px;border:1px solid rgba(255,255,255,.08);background:transparent;color:rgba(255,255,255,.4);cursor:pointer;text-align:center;transition:all .2s;font-family:'Black Han Sans',sans-serif;font-size:12px;letter-spacing:.5px;}
.life-pill.on{border-color:rgba(0,229,255,.4);background:rgba(0,229,255,.07);color:#00e5ff;}

.btn{width:100%;padding:14px 20px;border-radius:11px;border:none;font-family:'Black Han Sans',sans-serif;font-size:15px;letter-spacing:1px;cursor:pointer;transition:all .18s;}
.btn-cyan{background:linear-gradient(135deg,#00e5ff,#0099bb);color:#000;box-shadow:0 4px 20px rgba(0,229,255,0.18);}
.btn-cyan:hover{transform:translateY(-1px);box-shadow:0 6px 26px rgba(0,229,255,0.32);}
.btn-ghost{background:rgba(255,255,255,.04);color:var(–muted);border:1px solid rgba(255,255,255,.08);}
.btn-ghost:hover{background:rgba(255,255,255,.09);color:#fff;}
.btn:disabled{opacity:.25;cursor:not-allowed;transform:none!important;}

.inp{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:12px 14px;color:#fff;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;outline:none;transition:border-color .2s;}
.inp:focus{border-color:rgba(0,229,255,.5);}
.inp::placeholder{color:rgba(255,255,255,.2);font-weight:400;}

.slbl{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:8px;font-weight:700;}
.row{display:flex;gap:8px;width:100%;max-width:480px;}

@keyframes micPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
/* GAME — vertical player list */
.players-list{position:fixed;inset:0;z-index:1;display:flex;flex-direction:column;}
.pcard{flex:1;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;transition:flex .4s cubic-bezier(.34,1.2,.64,1),background .3s;}
.pcard.active{flex:2.2;}
.pcard.dead{flex:.3;opacity:.2;filter:grayscale(.9);}
.pcard-content{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:100%;padding:10px 14px;}
.pcard-row{display:flex;align-items:center;gap:8px;}
.pcard-name{font-family:'Black Han Sans',sans-serif;font-size:15px;letter-spacing:.5px;}
.pcard-hearts{display:flex;gap:2px;}
.pcard-status{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:var(–muted);font-weight:700;}

/* MIC */
.mic-btn{display:flex;flex-direction:column;align-items:center;gap:5px;border:none;background:transparent;cursor:pointer;padding:4px;}
.mic-ring{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative;transition:all .2s;}
.mic-ring.listening{animation:mPulse .8s ease-in-out infinite;}
@keyframes mPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.mic-ring-spin{position:absolute;inset:-3px;border-radius:50%;animation:spinRing 2s linear infinite;}
@keyframes spinRing{to{transform:rotate(360deg)}}
.mic-icon{font-size:26px;position:relative;z-index:1;}
.mic-label{font-family:'Black Han Sans',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;}

/* WHEEL */
.wheel-wrap{display:flex;flex-direction:column;align-items:center;margin:6px 0 18px;}
.wheel-stage{position:relative;width:280px;height:280px;}
.wheel-rotor{width:100%;height:100%;filter:drop-shadow(0 10px 24px rgba(0,0,0,.55));}
.wheel-rotor svg{width:100%;height:100%;display:block;}
.wheel-pointer{position:absolute;top:-4px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-top:28px solid #ff4d6d;filter:drop-shadow(0 3px 4px rgba(0,0,0,.6));z-index:3;}
.wheel-pointer::after{content:"";position:absolute;top:-30px;left:-6px;width:12px;height:12px;border-radius:50%;background:#ff4d6d;box-shadow:0 0 0 3px #fff;}
.wheel-hub{position:absolute;top:50%;left:50%;width:66px;height:66px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle at 35% 30%,#ffe27a,#ff9a3c 60%,#d85a2b);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px #fff,0 6px 14px rgba(0,0,0,.45);z-index:2;}
.wheel-hub svg{width:40px;height:40px;}
.wheel-picked{margin-top:14px;font-family:'Black Han Sans',sans-serif;font-size:26px;letter-spacing:2px;text-transform:uppercase;text-align:center;}
.wheel-spin-btn{margin-top:12px;padding:14px 44px;border-radius:999px;border:none;font-family:'Black Han Sans',sans-serif;font-size:22px;letter-spacing:4px;color:#fff;background:linear-gradient(135deg,#ff4d6d 0%,#ff9a3c 100%);box-shadow:0 6px 0 #b3233a,0 10px 20px rgba(0,0,0,.35);cursor:pointer;transition:transform .1s,box-shadow .1s;text-transform:uppercase;}
.wheel-spin-btn:active:not(:disabled){transform:translateY(4px);box-shadow:0 2px 0 #b3233a,0 6px 10px rgba(0,0,0,.3);}
.wheel-spin-btn:disabled{opacity:.7;cursor:default;}

/* TRANSCRIPT */
.transcript-wrap{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:280px;}
.transcript-display{background:rgba(0,0,0,.5);border-radius:10px;padding:8px 14px;width:100%;text-align:center;border:1.5px solid rgba(255,255,255,.15);font-family:'Black Han Sans',sans-serif;font-size:14px;letter-spacing:1px;min-height:34px;display:flex;align-items:center;justify-content:center;}
.transcript-ph{color:rgba(255,255,255,.2);font-size:11px;font-family:'DM Sans',sans-serif;font-weight:500;}
.transcript-row{display:flex;gap:7px;width:100%;}
.transcript-submit{flex-shrink:0;padding:8px 16px;border-radius:9px;border:none;font-family:'Black Han Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .15s;letter-spacing:.5px;}
.transcript-submit:disabled{opacity:.3;cursor:not-allowed;}
.t-err{font-size:10px;color:#ff4d6d;font-weight:700;letter-spacing:.5px;text-align:center;}
.used-strip{display:flex;flex-wrap:wrap;gap:6px;padding:2px 0;}
.used-tag{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:6px 12px;font-size:14px;color:rgba(255,255,255,.85);font-weight:700;white-space:nowrap;}

/* separator lines between cards */
.pcard-sep{position:absolute;bottom:0;left:0;right:0;height:1px;background:rgba(255,255,255,.06);pointer-events:none;}

/* HUB */
.hub{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;pointer-events:none;width:100px;height:100px;transition:width .3s,height .3s,opacity .3s;}
.hub-body{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 40% 35%,#1c2030,#090b12);box-shadow:0 0 0 1px rgba(255,255,255,.1),0 0 40px rgba(0,0,0,.9);}
.hub-arc-wrap{position:absolute;inset:-6px;width:calc(100% + 12px);height:calc(100% + 12px);}
.hub-arc-wrap svg{transform:rotate(-90deg);width:100%;height:100%;}
.hub-track{fill:none;stroke:rgba(255,255,255,.05);stroke-width:4;}
.hub-arc{fill:none;stroke-width:4;stroke-linecap:round;stroke-dasharray:340;transition:stroke-dashoffset 1s linear,stroke .4s;}
.hub-letter{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Black Han Sans',sans-serif;font-size:42px;line-height:1;filter:drop-shadow(0 0 12px currentColor);animation:lSlam .5s cubic-bezier(.34,1.3,.64,1);}
@keyframes lSlam{0%{transform:scale(.3);opacity:0}60%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
.hub-time{position:absolute;bottom:10px;left:0;right:0;text-align:center;font-family:'Black Han Sans',sans-serif;font-size:11px;transition:color .4s;letter-spacing:1px;}
.hub-cat{position:absolute;top:10px;left:0;right:0;text-align:center;font-size:12px;}
.hub-pulse{position:absolute;inset:-8px;border-radius:50%;border:2px solid currentColor;opacity:0;animation:hPulse 1s ease-out infinite;}
@keyframes hPulse{0%{transform:scale(.95);opacity:.5}100%{transform:scale(1.1);opacity:0}}

/* FLASH */
.pcard.flash-ok{animation:pOk .5s ease;}
.pcard.flash-no{animation:pNo .4s ease;}
@keyframes pOk{0%,100%{filter:brightness(1)}45%{filter:brightness(2) saturate(1.5)}}
@keyframes pNo{0%,100%{filter:brightness(1)}45%{filter:brightness(1.8) sepia(1) hue-rotate(300deg)}}

/* PASS */
.pass{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:30;background:rgba(8,10,16,.97);border-radius:16px;padding:16px 24px;text-align:center;animation:pIn .32s cubic-bezier(.34,1.2,.64,1);min-width:180px;}
@keyframes pIn{from{transform:translate(-50%,-50%) scale(.7);opacity:0}to{transform:translate(-50%,-50%) scale(1);opacity:1}}
.pass-lbl{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:var(–muted);margin-bottom:3px;font-weight:700;}
.pass-name{font-family:'Black Han Sans',sans-serif;font-size:22px;line-height:1.1;}

/* OVERLAYS */
.overlay{position:fixed;inset:0;z-index:40;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:22px;gap:13px;background:rgba(6,8,14,.92);backdrop-filter:blur(18px);animation:oIn .3s ease;overflow-y:auto;}
@keyframes oIn{from{opacity:0}to{opacity:1}}
.fact-card{width:100%;max-width:440px;background:linear-gradient(135deg,rgba(0,229,255,.07),rgba(10,12,18,.97));border:1px solid rgba(0,229,255,.2);border-radius:18px;padding:20px;position:relative;overflow:hidden;animation:factIn .4s cubic-bezier(.34,1.2,.64,1);}
@keyframes factIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.fact-card::before{content:'"';position:absolute;top:-8px;left:8px;font-family:'Black Han Sans',sans-serif;font-size:80px;color:rgba(0,229,255,.05);line-height:1;pointer-events:none;}
.fact-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);border-radius:20px;padding:3px 10px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#00e5ff;margin-bottom:8px;font-weight:700;}
.fact-cname{font-family:'Black Han Sans',sans-serif;font-size:20px;color:#fff;margin-bottom:4px;}
.fact-txt{font-size:14px;line-height:1.65;color:rgba(255,255,255,.7);font-weight:500;}
.correct-lbl{font-family:'Black Han Sans',sans-serif;font-size:28px;color:#69ff47;filter:drop-shadow(0 0 14px rgba(105,255,71,.4));letter-spacing:1px;}
.elim-emoji{font-size:64px;display:block;margin-bottom:8px;}
.elim-lbl{font-size:9px;letter-spacing:5px;text-transform:uppercase;color:#ff4d6d;font-weight:700;margin-bottom:2px;}
.elim-name{font-family:'Black Han Sans',sans-serif;font-size:36px;line-height:1.1;text-align:center;}
.elim-bar{width:36px;height:2px;margin:7px auto;opacity:.5;}
.elim-why{font-size:12px;color:var(–muted);font-style:italic;text-align:center;}
.win-emoji{font-size:64px;display:block;animation:wF 1.1s ease-in-out infinite;}
@keyframes wF{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.win-lbl{font-size:9px;letter-spacing:5px;text-transform:uppercase;font-weight:700;margin-bottom:2px;}
.win-name{font-family:'Black Han Sans',sans-serif;font-size:40px;line-height:1;text-align:center;filter:drop-shadow(0 0 16px currentColor);}
.win-bar{width:50px;height:1px;margin:9px auto;background:linear-gradient(90deg,transparent,currentColor,transparent);}
.win-stat{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(–muted);font-weight:700;}
.tag{display:inline-block;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:13px;padding:3px 8px;font-size:10px;color:var(–muted);font-weight:700;margin:2px;}
.tags{display:flex;flex-wrap:wrap;width:100%;max-width:440px;}
.mic-note{font-size:11px;color:rgba(255,255,255,.3);text-align:center;font-style:italic;font-weight:600;}

/* HALL OF FAME */
.hof-row{
display:flex;align-items:center;gap:12px;
padding:13px 15px;border-radius:14px;
border:1px solid rgba(255,255,255,.06);
background:rgba(255,255,255,.02);
margin-bottom:6px;transition:all .2s;
position:relative;overflow:hidden;
}
.hof-row::before{
content:'';position:absolute;left:0;top:0;bottom:0;width:3px;
border-radius:3px 0 0 3px;
}
.hof-rank{font-family:'Black Han Sans',sans-serif;font-size:18px;width:28px;text-align:center;flex-shrink:0;}
.hof-name{font-family:'Black Han Sans',sans-serif;font-size:15px;letter-spacing:.3px;}
.hof-detail{font-size:9px;color:rgba(255,255,255,.25);font-weight:700;letter-spacing:.5px;margin-top:2px;}
.hof-wins{font-family:'Black Han Sans',sans-serif;font-size:24px;text-align:right;flex-shrink:0;line-height:1;}
.hof-wins-lbl{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.25);font-weight:700;text-align:right;}

/* TAB BAR */
.tab-bar{display:flex;gap:0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:3px;width:100%;max-width:480px;}
.tab-btn{flex:1;padding:9px 6px;border-radius:9px;border:none;font-family:'Black Han Sans',sans-serif;font-size:11px;letter-spacing:.5px;cursor:pointer;transition:all .2s;background:transparent;color:rgba(255,255,255,.35);}
.tab-btn.on{background:rgba(0,229,255,.12);color:#00e5ff;box-shadow:inset 0 0 0 1px rgba(0,229,255,.25);}

/* CHAMP CARDS */
.champ-card{
flex:1;border-radius:14px;padding:12px 14px;
text-align:center;position:relative;overflow:hidden;
}
.champ-card::after{
content:'';position:absolute;inset:0;
background:linear-gradient(135deg,rgba(255,255,255,.04) 0%,transparent 60%);
pointer-events:none;
}
`;

const VOICE_ERR_MSG={
"not-allowed":"Mic blocked — allow microphone access in your browser settings",
"service-not-allowed":"Mic blocked by browser/OS settings",
"no-speech":"Didn't catch that — try again",
"audio-capture":"No microphone found on this device",
"network":"Speech service needs an internet connection",
"aborted":"",
};
function useVoice(onResult,onEnd){
const recRef=useRef(null);
const [listening,setListening]=useState(false);
const [error,setError]=useState("");
const start=useCallback(()=>{
setError("");
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){setError("Mic not supported in this browser — try Chrome, Edge or Safari");return;}
const r=new SR();
r.lang=(navigator.language||"en-US");r.interimResults=true;r.maxAlternatives=3;
r.onresult=(e)=>{const t=Array.from(e.results).map(r=>r[0].transcript).join("");onResult(t,e.results[e.results.length-1].isFinal);};
r.onend=()=>{setListening(false);onEnd();};
r.onerror=(e)=>{
  const code=e&&e.error?e.error:"";
  const msg=code in VOICE_ERR_MSG?VOICE_ERR_MSG[code]:(code?`Mic error: ${code}`:"Mic error");
  if(msg)setError(msg);
  setListening(false);onEnd();
};
recRef.current=r;
try{r.start();setListening(true);}
catch(err){setError(`Couldn't start mic: ${err&&err.message?err.message:"unknown error"}`);}
},[onResult,onEnd]);
const stop=useCallback(()=>{recRef.current?.stop();setListening(false);},[]);
const clearError=useCallback(()=>setError(""),[]);
return{listening,start,stop,error,clearError};
}

export default function App(){
const [screen,setScreen]=useState("landing");
const [players,setPlayers]=useState([]);
const [newName,setNewName]=useState("");
const [lives,setLives]=useState(3);
const [category,setCategory]=useState("countries");
const [letter,setLetter]=useState("");
const [curIdx,setCurIdx]=useState(0);
const [used,setUsed]=useState([]);
const [roundLog,setRoundLog]=useState([]);
const [timeLeft,setTimeLeft]=useState(TIMER_MAX);
const [transcript,setTranscript]=useState("");
const [inpErr,setInpErr]=useState("");
const [flash,setFlash]=useState({});
const [fact,setFact]=useState(null);
const [elim,setElim]=useState(null);
const [winner,setWinner]=useState(null);
const [brag,setBrag]=useState("");
const [forfeit,setForfeit]=useState("");
const [pass,setPass]=useState(null);
const [turnStarted,setTurnStarted]=useState(false);
const [preCount,setPreCount]=useState(PRE_TURN_SECS);
const [spinning,setSpinning]=useState(false);
const [spinAngle,setSpinAngle]=useState(0);
const spinRef=useRef(null);
const [hallOfFame,setHallOfFame]=useState([]); // [{name,color,wins:[{date,category}]}]
const [recTab,setRecTab]=useState("month"); // month | year | alltime
const voiceSupported=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
const timerRef=useRef(null);
const toutRef=useRef(false);

// Load hall of fame from storage on mount
useEffect(()=>{
try{
const saved=localStorage.getItem("khoza-hof-v2");
if(saved) setHallOfFame(JSON.parse(saved));
}catch(e){}
},[]);

// ── Champion helpers ──
const now=new Date();
const thisMonth=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
const thisYear=`${now.getFullYear()}`;
const MONTH_NAMES=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function winsInPeriod(player,period){
if(!player.wins) return 0;
return player.wins.filter(w=>{
const d=new Date(w.date);
if(period==="month") return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`===thisMonth;
if(period==="year") return `${d.getFullYear()}`===thisYear;
return true;
}).length;
}

function leaderboard(period){
return [...hallOfFame]
.map(p=>({...p,count:winsInPeriod(p,period)}))
.filter(p=>p.count>0)
.sort((a,b)=>b.count-a.count);
}

const monthlyChamp=leaderboard("month")[0]||null;
const yearlyChamp=leaderboard("year")[0]||null;
const allTimeChamp=leaderboard("alltime")[0]||null;

const stopTimer=()=>clearInterval(timerRef.current);
const startTimer=useCallback(()=>{
stopTimer();toutRef.current=false;setTimeLeft(TIMER_MAX);
timerRef.current=setInterval(()=>setTimeLeft(t=>{if(t<=1){stopTimer();return 0;}return t-1;}),1000);
},[]);

const handleVoiceResult=useCallback((text)=>{setTranscript(text);},[]);
const handleVoiceEnd=useCallback(()=>{},[]);
const voice=useVoice(handleVoiceResult,handleVoiceEnd);

useEffect(()=>{
if(timeLeft===0&&screen==="game"&&!toutRef.current){toutRef.current=true;voice.stop();loseLife(curIdx,"Ran out of time ⏰");}
},[timeLeft,screen]);

useEffect(()=>{
if(screen==="game"){setTranscript("");setInpErr("");setTurnStarted(false);}
return stopTimer;
},[screen,curIdx]);

// Start timer only when the pre-turn countdown finishes (or a tap skips it)
useEffect(()=>{
if(screen==="game"&&turnStarted) startTimer();
return stopTimer;
},[turnStarted]);

// Auto 5-second pre-turn countdown before each player's turn
useEffect(()=>{
if(screen!=="game"||turnStarted||players[curIdx]?.lives<=0) return;
setPreCount(PRE_TURN_SECS);
const id=setInterval(()=>{
  setPreCount(c=>{
    if(c<=1){
      clearInterval(id);
      setTurnStarted(true);
      if(voiceSupported){setTimeout(()=>{setTranscript("");setInpErr("");voice.start();},150);}
      return 0;
    }
    return c-1;
  });
},1000);
return()=>clearInterval(id);
},[screen,curIdx,turnStarted]);

function loseLife(idx,reason){
stopTimer();voice.stop();
setFlash({[idx]:"no"});setTimeout(()=>setFlash({}),500);
const upd=players.map((p,i)=>i===idx?{...p,lives:p.lives-1}:p);
setPlayers(upd);
const dying=upd[idx];
if(dying.lives<=0){
setElim({...dying,reason});
const rem=upd.filter(p=>p.lives>0);
if(rem.length===1){
setBrag(BRAGGING_RIGHTS[Math.floor(Math.random()*BRAGGING_RIGHTS.length)]);
setForfeit(FORFEITS[Math.floor(Math.random()*FORFEITS.length)]);
// update hall of fame with timestamped win
setHallOfFame(prev=>{
const now=new Date();
const winEntry={date:now.toISOString(),category};
const existing=prev.find(r=>r.name.toLowerCase()===rem[0].name.toLowerCase());
const updated=existing
?prev.map(r=>r.name.toLowerCase()===rem[0].name.toLowerCase()
?{...r,wins:[...r.wins,winEntry],color:rem[0].color}
:r)
:[...prev,{name:rem[0].name,color:rem[0].color,wins:[winEntry]}];
localStorage.setItem("khoza-hof-v2", JSON.stringify(updated));
return updated;
});
setTimeout(()=>{setWinner(rem[0]);setScreen("winner");},1800);
}else setScreen("eliminated");
}else showPass(upd,idx);
}

function showPass(arr,fromIdx){
const p=arr||players;
let next=(fromIdx+1)%p.length;
while(p[next].lives<=0)next=(next+1)%p.length;
setPass({name:p[next].name,emoji:p[next].emoji,color:p[next].color});
setTimeout(()=>{setPass(null);setCurIdx(next);setScreen("game");},1600);
}

function submit(valOverride){
stopTimer();voice.stop();
const val=(valOverride||transcript).trim();
if(!val)return;
const valid=getItems(category,letter);
const norm=s=>s.toLowerCase().trim().replace(/[.'’-]/g,"").replace(/\s+/g," ");
const forms=s=>{
  const n=norm(s);
  const set=new Set([n]);
  if(n.endsWith("ies")) set.add(n.slice(0,-3)+"y");
  if(n.endsWith("es")) set.add(n.slice(0,-2));
  if(n.endsWith("s")&&!n.endsWith("ss")) set.add(n.slice(0,-1));
  if(/[^aeiou]y$/.test(n)) set.add(n.slice(0,-1)+"ies");
  if(/(s|sh|ch|x|z)$/.test(n)) set.add(n+"es");
  set.add(n+"s");
  return set;
};
const valForms=forms(val);
const match=valid.find(c=>{
  const cForms=forms(c);
  for(const f of valForms) if(cForms.has(f)) return true;
  return false;
});
if(!match){setInpErr(`"${val}" — not on our ${CAT_SINGULAR[category]||"word"} list starting with ${letter}`);setTimeout(()=>loseLife(curIdx,`"${val}" not on our ${CAT_SINGULAR[category]||"word"} list`),900);return;}
if(used.includes(match)){setInpErr(`${match} already used!`);setTimeout(()=>loseLife(curIdx,`${match} already used`),900);return;}
setFlash({[curIdx]:"ok"});setTimeout(()=>setFlash({}),550);
setUsed(u=>[...u,match]);setRoundLog(r=>[...r,match]);
setFact({item:match,text:getFactFor(category,match),fromIdx:curIdx});
setTranscript("");setScreen("fact");
}

function spinCategory(){
if(spinning) return;
setSpinning(true);
let delay=60;
const tick=()=>{
  setCategory(ALL_CATS[Math.floor(Math.random()*ALL_CATS.length)]);
  delay+=45;
  if(delay<620){ spinRef.current=setTimeout(tick,delay); }
  else { setSpinning(false); }
};
tick();
}

function afterFact(){
const p=players;let next=(fact.fromIdx+1)%p.length;
while(p[next].lives<=0)next=(next+1)%p.length;
setPass({name:p[next].name,emoji:p[next].emoji,color:p[next].color});
setScreen("game");setCurIdx(next);setTimeout(()=>setPass(null),1600);
}

function addPlayer(){
if(!newName.trim()||players.length>=8)return;
const i=players.length;
setPlayers([...players,{name:newName.trim(),lives,emoji:SLOT_EMOJIS[i],color:SLOT_COLORS[i],id:Date.now()}]);
setNewName("");
}

function startGame(){
if(players.length<2)return;
const catData=CATEGORIES[category].data;
const validL=Object.keys(catData).filter(l=>catData[l].length>0);
const l=validL[Math.floor(Math.random()*validL.length)];
setLetter(l);setUsed([]);setRoundLog([]);setCurIdx(0);setTranscript("");setScreen("game");
}

function resetAll(){
setScreen("landing");setPlayers([]);setUsed([]);setRoundLog([]);
setWinner(null);setElim(null);setFact(null);setPass(null);
setBrag("");setForfeit("");setCategory("countries");voice.stop();
}

const cur=players[curIdx];
const arc=340-(340*(TIMER_MAX-timeLeft))/TIMER_MAX;
const tCol=timeLeft<=5?"#ff4d6d":timeLeft<=10?"#ffaa00":"#00e5ff";
const urgent=timeLeft<=10;
const catCfg=CATEGORIES[category];

const particles=Array.from({length:16},(_,i)=>({
left:`${5+i*6}%`,size:3+Math.random()*5,
dur:9+Math.random()*12,delay:-Math.random()*18,
color:SLOT_COLORS[i%SLOT_COLORS.length],
}));

return(
<>
<style>{css}</style>
<div className="app">
<div className="scanlines"/><div className="vignette"/>

    {/* LANDING */}
    {screen==="landing"&&(
      <div className="landing" onClick={()=>setScreen("setup")}>
        {particles.map((p,i)=>(
          <div key={i} className="lt-p" style={{left:p.left,width:p.size,height:p.size,background:p.color,animationDuration:`${p.dur}s`,animationDelay:`${p.delay}s`}}/>
        ))}
        <div className="landing-title">
          <span className="lt-family">The Khoza Family's</span>
          <div><span className="lt-last">Last </span><span className="lt-brain">Brain</span></div>
          <div><span className="lt-standing">Standing</span></div>
        </div>

        {/* monthly champion badge */}
        {monthlyChamp&&(
          <div style={{
            position:"relative",zIndex:2,marginTop:20,
            display:"flex",flexDirection:"column",alignItems:"center",gap:2,
          }}>
            <div style={{fontSize:9,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,.28)",fontWeight:700}}>
              {MONTH_NAMES[now.getMonth()]} Champion
            </div>
            <div style={{
              fontFamily:"'Black Han Sans',sans-serif",fontSize:20,
              color:monthlyChamp.color,
              filter:`drop-shadow(0 0 12px ${monthlyChamp.color}70)`,
              letterSpacing:.5,
            }}>
              👑 {monthlyChamp.name}
            </div>
            <div style={{fontSize:9,letterSpacing:2,color:"rgba(255,255,255,.25)",fontWeight:700}}>
              {monthlyChamp.count} {monthlyChamp.count===1?"win":"wins"} this month
            </div>
          </div>
        )}

        <div className="lt-tap">Tap anywhere to play</div>

        {hallOfFame.length>0&&(
          <button
            onClick={e=>{e.stopPropagation();setScreen("records");}}
            style={{
              position:"absolute",bottom:32,
              background:"rgba(255,255,255,.06)",
              border:"1px solid rgba(255,255,255,.1)",
              borderRadius:20,padding:"8px 20px",
              fontFamily:"'Black Han Sans',sans-serif",
              fontSize:11,letterSpacing:2,textTransform:"uppercase",
              color:"rgba(255,255,255,.45)",cursor:"pointer",
              transition:"all .2s",zIndex:2,
            }}
          >Hall of Fame</button>
        )}
      </div>
    )}

    {/* RECORDS */}
    {screen==="records"&&(
      <div className="flow" style={{gap:12,paddingTop:24,justifyContent:"flex-start"}}>
        {particles.map((p,i)=>(
          <div key={i} className="lt-p" style={{left:p.left,width:p.size,height:p.size,background:p.color,animationDuration:`${p.dur}s`,animationDelay:`${p.delay}s`,zIndex:0}}/>
        ))}

        {/* header */}
        <div style={{position:"relative",zIndex:1,textAlign:"center",width:"100%"}}>
          <div style={{fontSize:9,letterSpacing:5,textTransform:"uppercase",color:"rgba(255,255,255,.28)",fontWeight:700,marginBottom:4}}>The Khoza Family's</div>
          <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:36,background:"linear-gradient(135deg,#fff 30%,rgba(255,255,255,.5))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-1,lineHeight:1}}>
            Hall of Fame
          </div>
        </div>

        {/* champion banner cards */}
        <div style={{display:"flex",gap:8,width:"100%",maxWidth:480,position:"relative",zIndex:1}}>
          {[
            {champ:monthlyChamp, label:`${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`, icon:"👑"},
            {champ:yearlyChamp,  label:`${thisYear} Season`,                                  icon:"🏆"},
          ].map(({champ,label,icon},ci)=>(
            <div key={ci} className="champ-card"
              style={{
                background:champ?`linear-gradient(135deg,${champ.color}15,${champ.color}05)`:"rgba(255,255,255,.03)",
                border:`1px solid ${champ?champ.color+"30":"rgba(255,255,255,.07)"}`,
              }}>
              <div style={{fontSize:8,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.3)",fontWeight:700,marginBottom:6}}>{label}</div>
              {champ?(
                <>
                  <div style={{fontSize:18}}>{icon}</div>
                  <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:16,color:champ.color,marginTop:3,filter:`drop-shadow(0 0 8px ${champ.color}60)`,letterSpacing:.3}}>{champ.name}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,.3)",fontWeight:700,marginTop:3,letterSpacing:1}}>{champ.count} {champ.count===1?"win":"wins"}</div>
                </>
              ):(
                <div style={{fontSize:11,color:"rgba(255,255,255,.2)",fontWeight:600,marginTop:6}}>No champion yet</div>
              )}
            </div>
          ))}
        </div>

        {/* tab bar */}
        <div className="tab-bar" style={{position:"relative",zIndex:1}}>
          {[["month",MONTH_NAMES[now.getMonth()]],["year",thisYear],["alltime","All Time"]].map(([k,lbl])=>(
            <button key={k} className={`tab-btn${recTab===k?" on":""}`} onClick={()=>setRecTab(k)}>{lbl}</button>
          ))}
        </div>

        {/* leaderboard table */}
        <div style={{width:"100%",maxWidth:480,position:"relative",zIndex:1}}>
          {(()=>{
            const board=leaderboard(recTab);
            const MEDALS=["👑","🥈","🥉"];
            if(board.length===0) return(
              <div style={{
                textAlign:"center",padding:"28px 20px",
                background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",
                borderRadius:16,color:"rgba(255,255,255,.25)",fontSize:13,fontWeight:600,
              }}>
                {recTab==="month"?`No wins yet in ${MONTH_NAMES[now.getMonth()]}`:
                 recTab==="year"?`No wins yet in ${thisYear}`:
                 "Play a game to get on the board"}
              </div>
            );
            return(
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {board.map((r,i)=>{
                  const isFirst=i===0;
                  const recentDates=r.wins
                    .filter(w=>{
                      const d=new Date(w.date);
                      if(recTab==="month") return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`===thisMonth;
                      if(recTab==="year") return `${d.getFullYear()}`===thisYear;
                      return true;
                    })
                    .slice(-3)
                    .map(w=>{const d=new Date(w.date);return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;});
                  return(
                    <div key={r.name} className="hof-row"
                      style={{
                        borderColor:isFirst?r.color+"45":"rgba(255,255,255,.06)",
                        background:isFirst?r.color+"0d":"rgba(255,255,255,.02)",
                      }}>
                      {/* left accent bar */}
                      <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,borderRadius:"3px 0 0 3px",background:isFirst?r.color:"transparent"}}/>
                      <span className="hof-rank" style={{color:i<3?r.color:"rgba(255,255,255,.3)",marginLeft:4}}>
                        {i<3?MEDALS[i]:`${i+1}`}
                      </span>
                      <div style={{flex:1,minWidth:0}}>
                        <div className="hof-name" style={{color:isFirst?r.color:"rgba(255,255,255,.85)"}}>{r.name}</div>
                        <div className="hof-detail">{recentDates.join(" · ")}{r.count>3?` +${r.count-3} more`:""}</div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <div className="hof-wins" style={{color:isFirst?r.color:"rgba(255,255,255,.6)"}}>{r.count}</div>
                        <div className="hof-wins-lbl">{r.count===1?"win":"wins"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* actions */}
        <div className="row" style={{maxWidth:480,position:"relative",zIndex:1}}>
          {hallOfFame.length>0&&(
            <button className="btn btn-ghost" style={{flex:1,fontSize:12}} onClick={()=>{
              if(window.confirm("Clear ALL records permanently?")){
                localStorage.removeItem("khoza-hof-v2");
                setHallOfFame([]);
              }
            }}>Clear All</button>
          )}
          <button className="btn btn-cyan" style={{flex:2}} onClick={()=>setScreen("landing")}>← Back</button>
        </div>
      </div>
    )}

    {/* SETUP */}
    {screen==="setup"&&(
      <div className="flow">
        {/* same floating particles as landing */}
        {particles.map((p,i)=>(
          <div key={i} className="lt-p" style={{left:p.left,width:p.size,height:p.size,background:p.color,animationDuration:`${p.dur}s`,animationDelay:`${p.delay}s`,zIndex:0}}/>
        ))}
        <div style={{position:"relative",zIndex:1,textAlign:"center",marginBottom:2}}>
          <span className="setup-family">The Khoza Family's</span>
          <div className="setup-logo">
            <span className="s-last">Last </span><span className="s-brain">Brain</span><span className="s-stand"> Standing</span>
          </div>
        </div>
        <div className="setup-card" style={{position:"relative",zIndex:1}}>
          <div className="slbl">Category</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:10}}>
            {ALL_CATS.map(k=>{
              const col=CATEGORIES[k].color;
              const sel=category===k;
              return(
                <button key={k} className="cat-pill"
                  style={{
                    display:"inline-flex",alignItems:"center",gap:6,
                    borderColor:sel?col:"rgba(255,255,255,.1)",
                    background:sel?col+"22":"transparent",
                    color:sel?col:"rgba(255,255,255,.55)",
                    transform:sel&&spinning?"scale(1.06)":"scale(1)",
                    transition:"all .15s",
                  }}
                  onClick={()=>!spinning&&setCategory(k)}>
                  <svg width="14" height="14" viewBox="-10 -10 20 20" style={{flexShrink:0}}>
                    <g stroke={sel?col:"rgba(255,255,255,.55)"} fill={sel?col:"rgba(255,255,255,.55)"}>
                      {CAT_ICONS[k]}
                    </g>
                  </svg>
                  {CATEGORIES[k].label}
                </button>
              );
            })}
          </div>
          <button
            onClick={spinCategory}
            disabled={spinning}
            style={{
              width:"100%",marginBottom:18,padding:"14px 14px",borderRadius:12,
              border:`1.5px solid ${CATEGORIES[category].color}80`,
              background:`linear-gradient(135deg,${CATEGORIES[category].color}25,${CATEGORIES[category].color}08)`,
              color:CATEGORIES[category].color,
              fontFamily:"'Black Han Sans',sans-serif",fontSize:15,letterSpacing:3,
              textTransform:"uppercase",cursor:spinning?"default":"pointer",
              boxShadow:spinning?`0 0 24px ${CATEGORIES[category].color}80`:`0 0 10px ${CATEGORIES[category].color}30`,
              transition:"all .2s",
            }}
          >{spinning?`Spinning — ${CATEGORIES[category].label}`:"Spin the Brain"}</button>
          <div className="slbl">Players · 2 to 8</div>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <input className="inp" placeholder="Enter name..." value={newName}
              onChange={e=>setNewName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addPlayer()} maxLength={14}/>
            <button className="btn btn-cyan" style={{width:"auto",padding:"0 16px",fontSize:20,borderRadius:10}}
              onClick={addPlayer} disabled={!newName.trim()||players.length>=8}>+</button>
          </div>
          <div className="slbl" style={{marginBottom:8}}>Lives per player</div>
          <div className="life-sel" style={{marginBottom:16}}>
            {[["1","One life"],["2","Two lives"],["3","Three lives"]].map(([n,lbl])=>(
              <div key={n} className={`life-pill${lives===parseInt(n)?" on":""}`} onClick={()=>setLives(parseInt(n))}>{lbl}</div>
            ))}
          </div>
          {players.map((p,i)=>(
            <div key={p.id} className="prow">
              <div className="prow-dot" style={{background:p.color,boxShadow:`0 0 8px ${p.color}60`}}/>
              <span className="prow-name" style={{color:"rgba(255,255,255,.9)"}}>{p.name}</span>
              <div className="prow-lives">
                {Array.from({length:lives}).map((_,j)=><span key={j} className="prow-heart">❤️</span>)}
              </div>
              <button onClick={()=>setPlayers(players.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",color:"rgba(255,255,255,.2)",cursor:"pointer",fontSize:17,padding:"0 4px",lineHeight:1}}>×</button>
            </div>
          ))}
        </div>
        <div className="row" style={{maxWidth:480,position:"relative",zIndex:1}}>
          <button className="btn btn-ghost" style={{flex:1}} onClick={resetAll}>← Back</button>
          <button className="btn btn-cyan" style={{flex:2}} onClick={startGame} disabled={players.length<2}>
            {players.length<2?"Need 2+ Players":"Start Game →"}
          </button>
        </div>
      </div>
    )}

    {/* GAME */}
    {screen==="game"&&(
      <>
      <div className="players-list">
        {(()=>{
          const alive=players.map((p,i)=>({p,i})).filter(x=>x.p.lives>0);
          let nextIdx=-1;
          if(alive.length>1){
            const pos=alive.findIndex(x=>x.i===curIdx);
            nextIdx=alive[(pos+1)%alive.length].i;
          }
          return players.map((p,i)=>{
          const isActive=curIdx===i&&p.lives>0;
          const isDead=p.lives<=0;
          const isNextUp=i===nextIdx&&!isActive&&!isDead;
          const flashCls=flash[i]==="ok"?" flash-ok":flash[i]==="no"?" flash-no":"";
          const bg=isDead
            ?"rgba(255,255,255,.008)"
            :isActive
              ?`linear-gradient(160deg,${p.color}12,${p.color}04,rgba(13,17,23,0.7))`
              :isNextUp
                ?`linear-gradient(160deg,${p.color}14,${p.color}06)`
                :`linear-gradient(160deg,${p.color}07,${p.color}02)`;
          return(
            <div key={p.id} className={`pcard${isActive?" active":""}${isDead?" dead":""}${isNextUp?" next-up":""}${flashCls}`}
              style={{background:bg,boxShadow:isActive?`inset 0 0 0 1px ${p.color}35`:isNextUp?`inset 6px 0 0 -2px ${p.color}`:`inset 0 0 0 1px rgba(255,255,255,.04)`}}>
              <div className="pcard-sep"/>
              <div className="pcard-content">
                {isDead?(
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:p.color,opacity:.25}}/>
                    <span style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:11,color:p.color,opacity:.3,letterSpacing:2,textTransform:"uppercase"}}>Eliminated</span>
                  </div>
                ):isActive?(
                  !turnStarted?(
                    /* ── PRE-TURN: Start my turn ── */
                    <div style={{width:"100%",maxWidth:360,display:"flex",flexDirection:"column",alignItems:"center",gap:18,padding:"8px 0"}}>
                      <div style={{fontSize:10,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,.35)",fontWeight:700}}>Your Turn</div>
                      <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:34,color:p.color,filter:`drop-shadow(0 0 14px ${p.color}60)`,letterSpacing:.5,lineHeight:1}}>
                        {p.name}
                      </div>

                      {/* category + letter */}
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <span style={{fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.35)",fontWeight:700}}>{catCfg.label} with</span>
                        <div style={{
                          width:44,height:44,borderRadius:10,
                          background:`${p.color}20`,border:`1.5px solid ${p.color}50`,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontFamily:"'Black Han Sans',sans-serif",fontSize:24,color:p.color,
                          filter:`drop-shadow(0 0 8px ${p.color}60)`,
                        }}>{letter}</div>
                      </div>

                      {/* lives dots */}
                      <div style={{display:"flex",gap:6}}>
                        {Array.from({length:lives}).map((_,j)=>(
                          <div key={j} style={{width:8,height:8,borderRadius:"50%",background:j<p.lives?p.color:"rgba(255,255,255,.12)",boxShadow:j<p.lives?`0 0 6px ${p.color}`:"none"}}/>
                        ))}
                      </div>

                      {/* Auto-start countdown */}
                      <div style={{
                        marginTop:4,display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                      }}>
                        <div style={{fontSize:10,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,.4)",fontWeight:700}}>Starting in</div>
                        <div style={{
                          fontFamily:"'Black Han Sans',sans-serif",fontSize:72,lineHeight:1,
                          color:p.color,textShadow:`0 0 24px ${p.color}80`,letterSpacing:1,
                        }}>{preCount}</div>
                      </div>
                      <button
                        onClick={()=>{
                          setTurnStarted(true);
                          if(voiceSupported){setTimeout(()=>{setTranscript("");setInpErr("");voice.start();},200);}
                        }}
                        style={{
                          padding:"10px 22px",borderRadius:10,border:`1px solid ${p.color}60`,
                          background:"transparent",color:p.color,
                          fontFamily:"'Black Han Sans',sans-serif",fontSize:12,letterSpacing:2,
                          cursor:"pointer",textTransform:"uppercase",marginTop:2,
                        }}
                      >Skip →</button>
                    </div>
                  ):(
                  <div style={{width:"100%",maxWidth:560,display:"flex",flexDirection:"column",gap:18,padding:"0 12px"}}>

                    {/* ── Header: name + timer bar ── */}
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <div style={{width:14,height:14,borderRadius:"50%",background:p.color,boxShadow:`0 0 12px ${p.color}`,flexShrink:0}}/>
                      <span style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:32,color:p.color,letterSpacing:.8,flex:1}}>{p.name}</span>
                      {/* inline timer */}
                      <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                        <span style={{
                          fontFamily:"'Black Han Sans',sans-serif",fontSize:40,
                          color:tCol,letterSpacing:1.5,
                          textShadow:`0 0 14px ${tCol}`,
                          transition:"color .4s",
                        }}>{fmtTime(timeLeft)}</span>
                        <svg width="44" height="44" viewBox="0 0 44 44" style={{transform:"rotate(-90deg)",flexShrink:0}}>
                          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="4"/>
                          <circle cx="22" cy="22" r="18" fill="none" stroke={tCol} strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={2*Math.PI*18}
                            strokeDashoffset={(2*Math.PI*18)*(TIMER_MAX-timeLeft)/TIMER_MAX}
                            style={{transition:"stroke-dashoffset 1s linear,stroke .4s",filter:`drop-shadow(0 0 4px ${tCol})`}}/>
                        </svg>
                      </div>
                    </div>

                    {/* lives dots */}
                    <div style={{display:"flex",gap:10}}>
                      {Array.from({length:lives}).map((_,j)=>(
                        <div key={j} style={{width:14,height:14,borderRadius:"50%",background:j<p.lives?p.color:"rgba(255,255,255,.12)",boxShadow:j<p.lives?`0 0 8px ${p.color}`:"none"}}/>
                      ))}
                    </div>

                    {/* category + letter prompt */}
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <span style={{fontSize:14,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,.5)",fontWeight:700}}>{catCfg.label}</span>
                      <div style={{width:68,height:68,borderRadius:14,background:`${p.color}22`,border:`2px solid ${p.color}80`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Black Han Sans',sans-serif",fontSize:40,color:p.color,flexShrink:0,boxShadow:`0 0 20px ${p.color}40`}}>
                        {letter}
                      </div>
                    </div>

                    {/* used strip */}
                    {used.length>0&&(
                      <div className="used-strip">
                        {used.map(c=><span key={c} className="used-tag">{c}</span>)}
                      </div>
                    )}

                    {/* transcript display */}
                    <div style={{
                      minHeight:64,background:"rgba(0,0,0,.3)",
                      border:`2px solid ${transcript?p.color+"70":"rgba(255,255,255,.12)"}`,
                      borderRadius:14,padding:"14px 20px",
                      display:"flex",alignItems:"center",
                      fontFamily:"'Black Han Sans',sans-serif",fontSize:24,letterSpacing:.8,
                      transition:"border-color .2s",
                    }}>
                      {transcript
                        ?<span style={{color:p.color}}>{transcript}</span>
                        :<span style={{color:"rgba(255,255,255,.28)",fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:500}}>
                          {voice.listening?"Listening...":`Speak or type a ${CAT_SINGULAR[category]||"word"} with ${letter}...`}
                        </span>
                      }
                    </div>
                    {inpErr&&<div className="t-err">{inpErr}</div>}
                    {voice.error&&<div className="t-err" style={{color:"#ffb86b"}}>{voice.error}</div>}

                    {/* mic + type + submit row */}
                    <div style={{display:"flex",gap:12,alignItems:"center"}}>

                      {/* MIC BUTTON — primary */}
                      <button
                        onClick={()=>{
                          if(voice.listening){voice.stop();}
                          else{setTranscript("");setInpErr("");voice.clearError();voice.start();}
                        }}
                        style={{
                          width:66,height:66,borderRadius:16,border:"none",flexShrink:0,cursor:"pointer",
                          background:voice.listening?p.color:"rgba(255,255,255,.07)",
                          color:voice.listening?"#000":"rgba(255,255,255,.8)",
                          fontSize:28,display:"flex",alignItems:"center",justifyContent:"center",
                          boxShadow:voice.listening?`0 0 28px ${p.color}60`:"none",
                          transition:"all .2s",
                          animation:voice.listening?"micPulse .8s ease-in-out infinite":"none",
                        }}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor"/>
                          <path d="M6 11a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>

                      {/* type input — secondary */}
                      <input
                        value={transcript}
                        onChange={e=>{setTranscript(e.target.value);setInpErr("");voice.clearError();if(voice.listening)voice.stop();}}
                        onKeyDown={e=>e.key==="Enter"&&submit()}
                        placeholder="or type..."
                        style={{
                          flex:1,background:"rgba(255,255,255,.05)",
                          border:`1.5px solid rgba(255,255,255,.12)`,
                          borderRadius:14,padding:"18px 18px",color:"#fff",
                          fontFamily:"'DM Sans',sans-serif",fontSize:18,fontWeight:600,
                          outline:"none",letterSpacing:.4,height:66,
                        }}
                        autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} inputMode="text"
                      />

                      {/* submit */}
                      <button
                        style={{
                          width:66,height:66,borderRadius:16,border:"none",flexShrink:0,
                          background:transcript.trim()?p.color:"rgba(255,255,255,.06)",
                          color:transcript.trim()?"#000":"rgba(255,255,255,.25)",
                          fontFamily:"'Black Han Sans',sans-serif",fontSize:24,
                          cursor:transcript.trim()?"pointer":"not-allowed",
                          transition:"all .2s",
                          boxShadow:transcript.trim()?`0 0 24px ${p.color}60`:"none",
                        }}
                        disabled={!transcript.trim()}
                        onClick={()=>submit()}
                      >✓</button>
                    </div>
                  </div>
                  )
                ):(
                  <div style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"0 20px",maxWidth:560}}>
                    <div style={{width:12,height:12,borderRadius:"50%",background:p.color,opacity:isNextUp?1:.7,boxShadow:isNextUp?`0 0 10px ${p.color}`:"none",flexShrink:0}}/>
                    <span style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:22,color:p.color,opacity:isNextUp?1:.65,letterSpacing:.5,flex:1}}>{p.name}</span>
                    <div style={{display:"flex",gap:6}}>
                      {Array.from({length:lives}).map((_,j)=>(
                        <div key={j} style={{width:10,height:10,borderRadius:"50%",background:j<p.lives?p.color:"rgba(255,255,255,.12)",opacity:j<p.lives?.9:1}}/>
                      ))}
                    </div>
                    <span style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:isNextUp?p.color:"rgba(255,255,255,.3)",marginLeft:8,fontWeight:700}}>{isNextUp?"Next Up":"Waiting"}</span>
                  </div>
                )}
              </div>
            </div>
          );
        });
        })()}
      </div>
      {pass&&(
        <div className="pass" style={{border:`1px solid ${pass.color}40`,boxShadow:`0 0 0 4px ${pass.color}08,0 20px 60px rgba(0,0,0,.8)`}}>
          <div className="pass-lbl">Next up</div>
          <div className="pass-name" style={{color:pass.color}}>{pass.name}</div>
        </div>
      )}
      </>
    )}

    {/* FACT */}
    {screen==="fact"&&fact&&(
      <div className="overlay">
        <div style={{textAlign:"center"}}>
          <div className="correct-lbl">✓ Correct!</div>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginTop:3,fontWeight:700}}>{fact.item}</div>
        </div>
        <div className="fact-card">
          <div className="fact-badge">Brain Fact</div>
          <div className="fact-cname">{fact.item}</div>
          <div className="fact-txt">{fact.text}</div>
        </div>
        <button className="btn btn-cyan" style={{maxWidth:440,width:"100%"}} onClick={afterFact}>Next Player →</button>
      </div>
    )}

    {/* ELIMINATED */}
    {screen==="eliminated"&&elim&&(
      <div className="overlay">
        <div style={{width:48,height:48,borderRadius:"50%",background:elim.color+"20",border:`2px solid ${elim.color}60`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:4}}>
          <div style={{width:12,height:12,borderRadius:"50%",background:elim.color}}/>
        </div>
        <div className="elim-lbl">Eliminated</div>
        <div className="elim-bar" style={{background:elim.color}}/>
        <div className="elim-name" style={{color:elim.color}}>{elim.name}</div>
        <div className="elim-why">{elim.reason}</div>
        <button className="btn btn-cyan" style={{maxWidth:320,width:"100%",marginTop:8}} onClick={()=>{setElim(null);showPass(null,curIdx);}}>Continue →</button>
      </div>
    )}

    {/* WINNER */}
    {screen==="winner"&&winner&&(
      <div className="overlay" style={{gap:14}}>

        {/* winner identity */}
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:10,letterSpacing:5,textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:6,fontWeight:700}}>Last Brain Standing</div>
          <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:52,color:winner.color,filter:`drop-shadow(0 0 24px ${winner.color}60)`,lineHeight:1,letterSpacing:-1}}>
            {winner.name}
          </div>
          <div style={{width:60,height:1,background:`linear-gradient(90deg,transparent,${winner.color},transparent)`,margin:"10px auto"}}/>
          <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,.3)",fontWeight:700}}>{roundLog.length} {catCfg.label.toLowerCase()} named</div>
        </div>

        {/* bragging rights card */}
        <div style={{
          width:"100%",maxWidth:440,
          background:`linear-gradient(135deg,${winner.color}12,${winner.color}04)`,
          border:`1px solid ${winner.color}35`,
          borderRadius:18,padding:20,
        }}>
          <div style={{fontSize:9,letterSpacing:3,textTransform:"uppercase",color:winner.color,fontWeight:700,marginBottom:10}}>
            👑 Your Bragging Rights
          </div>
          <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:17,color:"#fff",lineHeight:1.5,letterSpacing:.3}}>
            {brag}
          </div>
        </div>

        {/* loser forfeit card */}
        {elim&&(
          <div style={{
            width:"100%",maxWidth:440,
            background:"rgba(255,77,109,0.07)",
            border:"1px solid rgba(255,77,109,0.2)",
            borderRadius:18,padding:20,
          }}>
            <div style={{fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"#ff4d6d",fontWeight:700,marginBottom:8}}>
              😬 {elim.name}'s Forfeit
            </div>
            <div style={{fontFamily:"'Black Han Sans',sans-serif",fontSize:15,color:"rgba(255,255,255,.8)",lineHeight:1.5,letterSpacing:.3}}>
              {forfeit}
            </div>
          </div>
        )}

        {/* answers log */}
        {roundLog.length>0&&(
          <div style={{width:"100%",maxWidth:440}}>
            <div style={{fontSize:"9px",letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.25)",marginBottom:6,fontWeight:700}}>{catCfg.label} named</div>
            <div className="tags">{roundLog.map(c=><span key={c} className="tag">{c}</span>)}</div>
          </div>
        )}

        <div className="row" style={{maxWidth:440}}>
          <button className="btn btn-ghost" style={{flex:1}} onClick={resetAll}>Home</button>
          <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setScreen("records")}>Records</button>
          <button className="btn btn-cyan" style={{flex:2}} onClick={()=>{
            setPlayers(players.map(p=>({...p,lives})));
            const catData=CATEGORIES[category].data;
            const validL=Object.keys(catData).filter(l=>catData[l].length>0);
            const l=validL[Math.floor(Math.random()*validL.length)];
            setLetter(l);setUsed([]);setRoundLog([]);setCurIdx(0);setTranscript("");setWinner(null);setScreen("game");
          }}>Play Again →</button>
        </div>
      </div>
    )}
  </div>
</>

);
}
