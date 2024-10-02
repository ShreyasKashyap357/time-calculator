"use client"

import { useState, useEffect } from 'react'
import { add, sub, differenceInSeconds, format, parse, addDays, addWeeks, addMonths, addYears } from 'date-fns'
import { toZonedTime } from 'date-fns-tz';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toast } from "@/components/ui/toast"
import { Moon, Sun, Clipboard, Check, Download } from "lucide-react"

type Calculation = {
  type: 'time' | 'difference' | 'recurring'
  input: string
  result: string
  timestamp: number
}

type RecurringEvent = {
  startDate: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  count: number
}

const DATE_FORMATS = [
  'yyyy-MM-dd HH:mm:ss',
  'dd/MM/yyyy HH:mm:ss',
  'MM/dd/yyyy HH:mm:ss',
  'MMMM d, yyyy HH:mm:ss',
  'dd MMMM yyyy HH:mm:ss',
]

export default function TimeCalculator() {
  const [timeUnits, setTimeUnits] = useState({
    days: 0,
    weeks: 0,
    months: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [operation, setOperation] = useState('add')
  const [result, setResult] = useState('')
  const [timeDiff, setTimeDiff] = useState({ start: '', end: '', result: '' })
  const [darkMode, setDarkMode] = useState(false)
  const [timezone, setTimezone] = useState('UTC')
  const [history, setHistory] = useState<Calculation[]>([])
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [dateFormat, setDateFormat] = useState(DATE_FORMATS[0])
  const [recurringEvent, setRecurringEvent] = useState<RecurringEvent>({
    startDate: '',
    frequency: 'daily',
    count: 1,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true'
      const savedTimezone = localStorage.getItem('timezone') || 'UTC'
      const savedDateFormat = localStorage.getItem('dateFormat') || DATE_FORMATS[0]
      const savedHistory = JSON.parse(localStorage.getItem('history') || '[]')
      
      setDarkMode(savedDarkMode)
      setTimezone(savedTimezone)
      setDateFormat(savedDateFormat)
      setHistory(savedHistory)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('timezone', timezone)
  }, [timezone])

  useEffect(() => {
    localStorage.setItem('dateFormat', dateFormat)
  }, [dateFormat])

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        calculateTime()
      } else if (e.ctrlKey && e.key === 'd') {
        calculateDifference()
      } else if (e.ctrlKey && e.key === 'r') {
        calculateRecurringEvents()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [timeUnits, operation, timeDiff, recurringEvent])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTimeUnits(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
  }

  const calculateTime = () => {
    try {
      const now = new Date()
      const zonedNow = toZonedTime(now, timezone)
      const calculatedTime = operation === 'add' 
        ? add(zonedNow, timeUnits)
        : sub(zonedNow, timeUnits)
      const formattedResult = format(calculatedTime, dateFormat)
      setResult(formattedResult)
      addToHistory('time', JSON.stringify(timeUnits), formattedResult)
      setError('')
    } catch (err) {
      setError('Invalid input. Please check your values and try again.')
    }
  }

  const calculateDifference = () => {
    if (timeDiff.start && timeDiff.end) {
      try {
        const start = parse(timeDiff.start, "yyyy-MM-dd'T'HH:mm", new Date())
        const end = parse(timeDiff.end, "yyyy-MM-dd'T'HH:mm", new Date())
        const diffInSeconds = Math.abs(differenceInSeconds(end, start))
        const days = Math.floor(diffInSeconds / (3600 * 24))
        const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
        const minutes = Math.floor((diffInSeconds % 3600) / 60)
        const seconds = diffInSeconds % 60
        const result = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        setTimeDiff(prev => ({ ...prev, result }))
        addToHistory('difference', `${timeDiff.start} to ${timeDiff.end}`, result)
        setError('')
      } catch (err) {
        setError('Invalid date input. Please check your values and try again.')
      }
    }
  }

  const calculateRecurringEvents = () => {
    try {
      const { startDate, frequency, count } = recurringEvent
      const start = parse(startDate, "yyyy-MM-dd'T'HH:mm", new Date())
      const events = [format(start, dateFormat)]

      for (let i = 1; i < count; i++) {
        let nextDate
        switch (frequency) {
          case 'daily':
            nextDate = addDays(start, i)
            break
          case 'weekly':
            nextDate = addWeeks(start, i)
            break
          case 'monthly':
            nextDate = addMonths(start, i)
            break
          case 'yearly':
            nextDate = addYears(start, i)
            break
        }
        events.push(format(nextDate, dateFormat))
      }

      const result = events.join('\n')
      setResult(result)
      addToHistory('recurring', JSON.stringify(recurringEvent), result)
      setError('')
    } catch (err) {
      setError('Invalid input for recurring events. Please check your values and try again.')
    }
  }

  const addToHistory = (type: 'time' | 'difference' | 'recurring', input: string, result: string) => {
    setHistory(prev => [{ type, input, result, timestamp: Date.now() }, ...prev.slice(0, 19)])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const exportHistory = () => {
    const historyData = JSON.stringify(history, null, 2)
    const blob = new Blob([historyData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'time-calculator-history.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Time Calculator</h1>
        <div className="flex items-center space-x-2">
          <Select onValueChange={setTimezone} defaultValue={timezone}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {Intl.supportedValuesOf('timeZone').map((tz) => (
                <SelectItem key={tz} value={tz}>{tz}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setDateFormat} defaultValue={dateFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              {DATE_FORMATS.map((format) => (
                <SelectItem key={format} value={format}>{format}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full"
          >
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="calculate">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculate">Calculate Time</TabsTrigger>
          <TabsTrigger value="difference">Time Difference</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Events</TabsTrigger>
        </TabsList>
        <TabsContent value="calculate">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.keys(timeUnits).map((unit) => (
              <div key={unit}>
                <Label htmlFor={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</Label>
                <Input
                  type="number"
                  id={unit}
                  name={unit}
                  value={timeUnits[unit as keyof typeof timeUnits]}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            ))}
          </div>
          <RadioGroup defaultValue="add" className="flex mb-4" onValueChange={setOperation}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="add" id="add" />
              <Label htmlFor="add">Add</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="subtract" id="subtract" />
              <Label htmlFor="subtract">Subtract</Label>
            </div>
          </RadioGroup>
          <Button onClick={calculateTime} className="w-full mb-4">Calculate (Ctrl+Enter)</Button>
          {result && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded flex justify-between items-center">
              <div>
                <h2 className="font-semibold">Result:</h2>
                <p>{result}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result)}>
                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="difference">
          <div className="space-y-4">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                type="datetime-local"
                id="start-time"
                value={timeDiff.start}
                onChange={(e) => setTimeDiff(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input
                type="datetime-local"
                id="end-time"
                value={timeDiff.end}
                onChange={(e) => setTimeDiff(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
            <Button onClick={calculateDifference} className="w-full">Calculate Difference (Ctrl+D)</Button>
            {timeDiff.result && (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">Time Difference:</h2>
                  <p>{timeDiff.result}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(timeDiff.result)}>
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="recurring">
          <div className="space-y-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                type="datetime-local"
                id="start-date"
                value={recurringEvent.startDate}
                onChange={(e) => setRecurringEvent(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                onValueChange={(value: 'daily' | 'weekly' | 'monthly' | 'yearly') => setRecurringEvent(prev => ({ ...prev, frequency: value }))}
                defaultValue={recurringEvent.frequency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="count">Number of Occurrences</Label>
              <Input
                type="number"
                id="count"
                value={recurringEvent.count}
                onChange={(e) => setRecurringEvent(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
                min="1"
              />
            </div>
            <Button onClick={calculateRecurringEvents} className="w-full">Calculate Recurring Events (Ctrl+R)</Button>
            {result && (
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">Recurring Events:</h2>
                  <pre className="whitespace-pre-wrap">{result}</pre>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result)}>
                  {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded">
          {error}
        </div>
      )}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Calculation History</h2>
          <Button variant="outline" size="sm" onClick={exportHistory}>
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
        </div>
        <ul className="space-y-2">
          {history.map((calc, index) => (
            <li key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
              <p><strong>{calc.type === 'time' ? 'Time Calculation' : calc.type === 'difference' ? 'Time Difference' : 'Recurring Events'}</strong></p>
              <p>Input: {calc.input}</p>
              <p>Result: {calc.result}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(calc.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Toast open={copied} onOpenChange={setCopied}>
        <div className="bg-green-500 text-white p-2 rounded">Copied to clipboard!</div>
      </Toast>
    </div>
  )
}