import * as mc from '@minecraft/server'
import { CanopyExtension, Command, Rule } from 'lib/canopy/CanopyExtension';
const extension = new CanopyExtension({
    name: 'StorageUtilities',
    description: 'Storage Utilities is an addon aimed to improve the process of making a system related to storage tech.',
    version: '0.0.1',
});
const StorageUtilities = new Rule({
    identifier: 'StorageUtilities',
    description: 'Disables or enables Storage Utilities',
});
extension.addRule(StorageUtilities)


const ItemSetCommand = new Command({
    name: 'itemset', // The name of the command
    description: 'Load structure file of a certain item set.', // Shows up in the help command. Can be a string or RawMessage type.
    usage: 'itemset [name]', // The usage of the command that shows up in the help command & when used incorrectly
    callback: ItemSetCommandCallback, // The function to run when the command is executed
    // Optional:
    args: [
        { type: 'string|number', name: 'itemsetname' } // The arguments that the command takes. 'string|number' means it can be either a string or a number
    ],
    contingentRules: ['StorageUtilities'], // Rules that must be true for the command to be enabled
    adminOnly: false, // Whether the command can only be run by admins (users with the 'CanopyAdmin' tag)
    helpEntries: [ // Additional help entries that show up in the help command
     { usage: `itemset casual`, description: `Loads casual item set` }, // Description can be a string or RawMessage type.
     { usage: `itemset TMC`, description: `Loads TMC item set` },
     { usage: `itemset mixed`, description: `Loads mixed item set` },
     { usage: `itemset split`, description: `Loads split item set` },
     { usage: `itemset nonstackable`, description: `Loads nonstackable item set` },
     { usage: `itemset bulk`, description: `Loads bulk item set` },
    ],
    helpHidden: false // Whether the command should be hidden from the help command.
});
extension.addCommand(ItemSetCommand);

const SSCommand = new Command({
    name: 'ss', // The name of the command
    description: 'Load structure file of a certain item set.', // Shows up in the help command. Can be a string or RawMessage type.
    usage: 'ss [container] [value]', // The usage of the command that shows up in the help command & when used incorrectly
    callback: SSCommandCallback, // The function to run when the command is executed
    // Optional:
    args: [
        { type: 'string', name: 'container' }, // The arguments that the command takes. 'string|number' means it can be either a string or a number
        { type: 'number', name: 'value' } // The arguments that the command takes. 'string|number' means it can be either a string or a number
    ],
    contingentRules: ['StorageUtilities'], // Rules that must be true for the command to be enabled
    adminOnly: false, // Whether the command can only be run by admins (users with the 'CanopyAdmin' tag)
    helpEntries: [ // Additional help entries that show up in the help command
    ],
    helpHidden: false // Whether the command should be hidden from the help command.
});
extension.addCommand(SSCommand);

const UtilityItemsCommand = new Command({
    name: 'utilityitems', // The name of the command
    description: 'Load utility items structure.', // Shows up in the help command. Can be a string or RawMessage type.
    usage: 'utilityitems', // The usage of the command that shows up in the help command & when used incorrectly
    callback: UtilityItemsCommandCallback, // The function to run when the command is executed
    // Optional:
    args: [
    ],
    contingentRules: ['StorageUtilities'], // Rules that must be true for the command to be enabled
    adminOnly: false, // Whether the command can only be run by admins (users with the 'CanopyAdmin' tag)
    helpEntries: [ // Additional help entries that show up in the help command
    ],
    helpHidden: false // Whether the command should be hidden from the help command.
});
extension.addCommand(UtilityItemsCommand);

function ItemSetCommandCallback(sender, args) {
    let { itemsetname } = args;
    let {x, y, z} = sender.location
const ItemSetNames = new Set(['casual', 'tmc', 'mixed', 'split', 'nonstackable', 'bulk'])
const IsValidItemSet = ItemSetNames.has(itemsetname)
const ItemSetStructures = {
    casual:'',
    tmc:'',
    mixed:'',
    split:'mystructure:split item set',
    nonstackable:'',
    bulk:''
}
                if (IsValidItemSet === true) {
          mc.world.structureManager.place(ItemSetStructures[itemsetname], sender.dimension, {x: x+1 ,y: y, z: z+1} )
          sender.sendMessage(`§aLoaded item set ${itemsetname}`) 
        }
        else sender.sendMessage(`§c${itemsetname} is not an valid item set. Please try again`)
    }

function SSCommandCallback(sender, args) {
    let { container, value} = args;
    const HopperSS = {
1:'1 item',
2:'23 items',
3:'46 items',
4:'nonstackable + 5 items',
5:'nonstackable + 28 items',
6:'nonstackable + 51 items',
7:'2 nonstackables + 10 items',
8:'2 nonstackables + 32 items',
9:'2 nonstackables + 55 items',
10:'3 nonstackables + 14 items',
11:'3 nonstackables + 37 items',
12:'3 nonstackables + 60 items',
13:'4 nonstackables + 19 items',
14:'4 nonstackables + 43 items',
15:'5 nonstackables'
    }
    const LecternSS = {
1:'pages 1-2/30',
2:'pages 3-4/30',
3:'pages 5-6/30',
4:'pages 7-8/30',
5:'pages 9-10/30',
6:'pages 11-12/30',
7:'pages 13-14/30',
8:'pages 15-16/30',
9:'pages 17-18/30',
10:'pages 19-20/30',
11:'pages 21-22/30',
12:'pages 23-24/30',
13:'pages 25-26/30',
14:'pages 27-28/30',
15:'pages 29-30/30'
    }
    const ComposterSS = {
1:'1 pumpkin pie',
2:'2 pumpkin pies',
3:'3 pumpkin pies',
4:'4 pumpkin pies',
5:'5 pumpkin pies',
6:'6 pumpkin pies',
7:'Not possible',
8:'8 pumpkin pies'
    }
    const CrafterSS = {
1:'1 slot',
2:'2 slots',
3:'3 slots',
4:'4 slots',
5:'5 slots',
6:'6 slots',
7:'7 slots',
8:'8 slots',
9:'9 slots'
    }
    const BarrelChestSS = {
1:'1 nonstackables',
2:'2 nonstackables',
3:'4 nonstackables',
4:'6 nonstackables',
5:'8 nonstackables',
6:'10 nonstackables',
7:'12 nonstackabless',
8:'14 nonstackables',
9:'16 nonstackables',
10:'18 nonstackables',
11:'20 nonstackables',
12:'22 nonstackables',
13:'24 nonstackables',
14:'26 nonstackables',
15:'27 nonstackables'
    }
    const PotSS = {
    1:'1 16 stackable',
    2:'2 16 stackables',
    3:'3 16 stackables',
    4:'4 16 stackables',
    5:'5 16 stackables',
    6:'6 16 stackables',
    7:'7 16 stackables',
    8:'8 16 stackables',
    9:'10 16 stackables',
    10:'11 16 stackables',
    11:'12 16 stackables',
    12:'13 16 stackables',
    13:'14 16 stackables',
    14:'15 16 stackables',
    15:'16 16 stackables'
    }
    const FurnaceSS = {
1:'1 item',
2:'14 items',
3:'28 items',
4:'42 items',
5:'64 items',
6:'64 + 5 items',
7:'64 + 19 items',
8:'64 + 32 items',
9:'64 + 46 items',
10:'64 + 64 items'
   }
    const SS = {
    hopper:HopperSS,
    lectern:LecternSS,
    composter:ComposterSS,
    crafter:CrafterSS,
    barrel:BarrelChestSS,
    chest:BarrelChestSS,
    pot:PotSS,
    furnace:FurnaceSS
}
const Containers = new Set(['hopper', 'lectern', 'composter', 'crafter', 'barrel', 'chest', 'pot', 'furnace'])
const ValidContainer = Containers.has(container)
const MaxSS = {
    hopper:15,
    lectern:15,
    composter:8,
    crafter:9,
    barrel:15,
    chest:15,
    pot:15,
    furnace:10,
}
if (ValidContainer === true && value <= MaxSS[container]) {
    sender.sendMessage(`§aFor SS of ${value} in ${container} you need §l§2${SS[container][value]}`)
}
else sender.sendMessage('§cSS/continer is not valid. Please try again')
}
function UtilityItemsCommandCallback(sender, args) {
    let {x, y, z} = sender.location
    mc.world.structureManager.place('mystructure:usefulitems', sender.dimension, {x: x ,y: y-1, z: z})
    sender.sendMessage('§aLoaded utility items')
}




