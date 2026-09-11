"use client";

import type { FC, ReactNode } from "react";
import { File04, Folder, Paperclip } from "@properui/icons";
import { TreeView, type TreeViewSize } from "./tree-view";

interface TreeNode {
    id: string;
    label: string;
    /** People rows carry no icon, matching the reference. */
    icon?: FC<{ className?: string }>;
    children?: TreeNode[];
}

const folder = (id: string, label: string, children?: TreeNode[]): TreeNode => ({ id, label, icon: Folder, children });
const person = (id: string, label: string): TreeNode => ({ id, label });

const nodes: TreeNode[] = [
    folder("org", "Organization", [
        folder("eng", "Engineering"),
        folder("design", "Design", [person("sienna", "Sienna Hewitt"), person("ammar", "Ammar Foley"), person("caitlyn", "Caitlyn King")]),
        folder("product", "Product"),
        folder("marketing", "Marketing"),
        folder("sales", "Sales"),
        folder("cs", "Customer Success"),
        folder("ops", "Operations"),
        folder("finance", "Finance"),
    ]),
    folder("projects", "Projects", [
        folder("powersurge", "Powersurge", [
            folder("client-brief", "Client brief", [
                { id: "brief-v1", label: "Brief_v1", icon: File04 },
                { id: "brief-v2", label: "Brief_v2", icon: File04 },
            ]),
            { id: "deliverables", label: "Deliverables", icon: File04 },
            { id: "assets", label: "assets.zip", icon: Paperclip },
        ]),
        folder("ikigai", "Ikigai Labs"),
        folder("lightspeed", "Lightspeed"),
        folder("voxel", "Voxel Labs"),
    ]),
    folder("eng-root", "Engineering"),
    folder("marketing-root", "Marketing"),
    folder("customer-data", "Customer data"),
    folder("settings", "Settings"),
];

const expandedKeys = ["org", "design", "projects", "powersurge", "client-brief"];
const selectedKeys = new Set(["sienna", "ammar", "caitlyn", "assets", "eng-root"]);

const renderNodes = (items: TreeNode[], hasIcons: boolean): ReactNode =>
    items.map((node) => (
        <TreeView.Item key={node.id} id={node.id} textValue={node.label}>
            <TreeView.ItemContent icon={hasIcons ? node.icon : undefined}>{node.label}</TreeView.ItemContent>
            {node.children && renderNodes(node.children, hasIcons)}
        </TreeView.Item>
    ));

const SimpleTree = ({ size }: { size: TreeViewSize }) => (
    <div className="min-w-xs">
        <TreeView aria-label="Organization" size={size} defaultExpandedKeys={expandedKeys}>
            {renderNodes(nodes, false)}
        </TreeView>
    </div>
);

const AdvancedTree = ({ size }: { size: TreeViewSize }) => (
    <div className="min-w-xs">
        <TreeView
            aria-label="Organization"
            size={size}
            hasGuides
            isDraggable
            selectionMode="multiple"
            defaultSelectedKeys={selectedKeys}
            defaultExpandedKeys={expandedKeys}
        >
            {renderNodes(nodes, true)}
        </TreeView>
    </div>
);

export const TreeViewExample = () => <AdvancedTree size="sm" />;

export const SimpleSm = () => <SimpleTree size="sm" />;

export const SimpleMd = () => <SimpleTree size="md" />;

export const AdvancedSm = () => <AdvancedTree size="sm" />;

export const AdvancedMd = () => <AdvancedTree size="md" />;
