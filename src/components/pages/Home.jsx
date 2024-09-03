import React, { useState } from 'react';
import video from '../../assets/video.mp4';
import deleteIcon from '../../assets/delete.png';
import { useDispatch, useSelector } from 'react-redux';
import { addTextBox, updateTextBox, deleteTextBox } from '../../store/textBoxSlice';
import { v4 as uuidv4 } from 'uuid';
import { Rnd } from 'react-rnd';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Navbar } from "@/components/ui/navigation-menu"
import "../../index.css"

const Home = () => {
    const dispatch = useDispatch();
    const textBoxes = useSelector((state) => state.textBoxes);

    const [selectedBoxId, setSelectedBoxId] = useState(null);

    const handleAddText = () => {
        if (textBoxes.length === 0) {
            const newTextBox = {
                id: uuidv4(),
                text: 'Add Text Here...',
                x: 50,
                y: 50,
                width: 200,
                height: 100,
            };
            dispatch(addTextBox(newTextBox));
            setSelectedBoxId(newTextBox.id);
        }
    };

    const handleUpdateTextBox = (id, updates) => {
        dispatch(updateTextBox({ id, updates }));
    };

    const handleDeleteTextBox = (id) => {
        dispatch(deleteTextBox(id));
    };

    const handleUpdateSelectedBox = (updates) => {
        if (selectedBoxId) {
            const updatedBox = textBoxes.find(box => box.id === selectedBoxId);
            if (updatedBox) {
                const newUpdates = { ...updates };
                if (updates.width) newUpdates.width = parseInt(updates.width);
                if (updates.height) newUpdates.height = parseInt(updates.height);
                dispatch(updateTextBox({ id: selectedBoxId, updates: newUpdates }));
            }
        }
    };

    const handleActionClick = () => {
        console.log("Dummy Button");
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar
                className="border-b"
                onActionClick={handleActionClick}
            />
            <div className="flex flex-1 overflow-hidden">
                <div className="w-3/4 relative bg-black flex items-center justify-center">
                    <div className="relative w-3/4 h-3/4">
                        <video
                            id="video-player"
                            className="w-full h-full object-contain"
                            controls
                            src={video}
                        />
                        {textBoxes.map((box) => (
                            <Rnd
                                key={box.id}
                                size={{ width: box.width, height: box.height }}
                                position={{ x: box.x, y: box.y }}
                                onMouseDown={() => setSelectedBoxId(box.id)}
                                onDragStop={(e, d) => handleUpdateTextBox(box.id, { x: d.x, y: d.y })}
                                onResizeStop={(e, direction, ref, delta, position) => {
                                    handleUpdateTextBox(box.id, {
                                        width: ref.style.width,
                                        height: ref.style.height,
                                        ...position,
                                    });
                                }}
                                bounds="parent"
                            >
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        padding: '5px',
                                        position: 'relative',
                                        cursor: 'move',
                                        ...box.style,
                                    }}
                                >
                                    <textarea
                                        value={box.text}
                                        onChange={(e) => handleUpdateTextBox(box.id, { text: e.target.value })}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                            background: 'transparent',
                                            resize: 'none',
                                            fontFamily: box.fontFamily,
                                            fontSize: box.fontSize,
                                            fontWeight: box.fontWeight,
                                            fontStyle: box.fontStyle,
                                            textDecoration: box.textDecoration,
                                            color: box.color,
                                            textAlign: box.textAlign,
                                        }}
                                    />
                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            border: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleDeleteTextBox(box.id)}
                                    >
                                        <img height={20} width={25} src={deleteIcon} alt="Delete" />
                                    </button>
                                </div>
                            </Rnd>
                        ))}
                    </div>
                </div>
                <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Text Configuration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleAddText} className="w-full mb-4" disabled={textBoxes.length > 0}>Add Text</Button>
                            <Separator className="my-4" />
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="x-position">X Position</label>
                                        <Input id="x-position" type="number" onChange={(e) => handleUpdateSelectedBox({ x: parseInt(e.target.value) })} />
                                    </div>
                                    <div>
                                        <label htmlFor="y-position">Y Position</label>
                                        <Input id="y-position" type="number" onChange={(e) => handleUpdateSelectedBox({ y: parseInt(e.target.value) })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="width">Width</label>
                                        <Input
                                            id="width"
                                            type="number"
                                            value={textBoxes.find(box => box.id === selectedBoxId)?.width || ''}
                                            onChange={(e) => handleUpdateSelectedBox({ width: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="height">Height</label>
                                        <Input
                                            id="height"
                                            type="number"
                                            value={textBoxes.find(box => box.id === selectedBoxId)?.height || ''}
                                            onChange={(e) => handleUpdateSelectedBox({ height: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <Select onValueChange={(value) => handleUpdateSelectedBox({ fontFamily: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Font Name" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="arial">Arial</SelectItem>
                                        <SelectItem value="helvetica">Helvetica</SelectItem>
                                        <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="grid grid-cols-2 gap-4">
                                    <Select onValueChange={(value) => handleUpdateSelectedBox({ fontStyle: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Font Style" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="italic">Italic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select onValueChange={(value) => handleUpdateSelectedBox({ fontSize: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Font Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
                                                <SelectItem key={size} value={size}>{size}px</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex justify-between items-center">
                                    <ToggleGroup type="single" onValueChange={(value) => handleUpdateSelectedBox({ textAlign: value })}>
                                        <ToggleGroupItem value="left">Left</ToggleGroupItem>
                                        <ToggleGroupItem value="center">Center</ToggleGroupItem>
                                        <ToggleGroupItem value="right">Right</ToggleGroupItem>
                                    </ToggleGroup>
                                    <div className="space-x-2">
                                        <Button variant="outline" onClick={() => handleUpdateSelectedBox({ fontWeight: 'bold' })}>B</Button>
                                        <Button variant="outline" onClick={() => handleUpdateSelectedBox({ textDecoration: 'underline' })}>U</Button>
                                        <Button variant="outline" onClick={() => handleUpdateSelectedBox({ fontStyle: 'italic' })}>I</Button>
                                    </div>
                                </div>
                                <Select onValueChange={(value) => handleUpdateSelectedBox({ color: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Font Color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="black">Black</SelectItem>
                                        <SelectItem value="red">Red</SelectItem>
                                        <SelectItem value="blue">Blue</SelectItem>
                                        <SelectItem value="green">Green</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Home;
