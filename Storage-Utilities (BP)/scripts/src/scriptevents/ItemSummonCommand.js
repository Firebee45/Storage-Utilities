import { system } from '@minecraft/server';
import extension from 'config';
import ArgumentParser from 'lib/canopy/ArgumentParser';
import { ItemSummonCommandCallback } from 'src/commands/ItemSummonCommand';

system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id !== 'storageutilities:itemsummon') return;
    const sender = getSource(event);
    if (sender === null) return;
    if (!extension. getRuleValue('StorageUtilites')) return sender.sendMessage('§cThe StorageUtilites rule is disabled');
    const [ item, amount, x, y, z ]= ArgumentParser.parseArgs(event.message);
    const args = { item, amount, x, y, z };
    for (const key in args) {
        if (args[key] === undefined) {
            args[key] = null;
        }
    }
    ItemSummonCommand(sender, args);
});

function getSource(event) {};