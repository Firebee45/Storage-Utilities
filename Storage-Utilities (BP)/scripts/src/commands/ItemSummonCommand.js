import * as mc from '@minecraft/server'
import { ItemStack } from '@minecraft/server'
import {Command} from 'lib/canopy/CanopyExtension';
import  extension from 'config'
const ItemSummonCommand = new Command({
    name: 'itemsummon',
    description: 'A command to summon any items from nothing',
    usage: 'itemsummon [item] [amount] [location]',
    callback: ItemSummonCommandCallback,
    args: [
      { type: 'string|number', name: 'item' },
      { type: 'number', name: 'amount' },
      { type: 'number', name: 'x' },
      { type: 'number', name: 'y' },
      { type: 'number', name: 'z' },
    ],
    contingentRules: ['StorageUtilities'],
    adminOnly: false,
    helpEntries: [
    ],
    helpHidden: false
});
extension.addCommand(ItemSummonCommand);

function ItemSummonCommandCallback(sender, args){
    let { item, amount, x, y, z } = args;
    const location = {x: x, y: y, z:z}
    sender.dimension.spawnItem(new ItemStack(item, amount), location);
    itemEntity.clearVerocity();
};

export { ItemSummonCommandCallback }